import { Request, Response } from "express";
import { getPrismaClient } from '../config/database'

const db = getPrismaClient();
import { getMeritHubToken } from "../lib/marithub";
import axios from "axios";

/**
 * Add user (Teacher / Student) to MeritHub
 */
export const addUserToMeritHub = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = await db.user.findUnique({ where: { user_id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.merithubUserId) {
      return res.json({
        message: "Already exists",
        merithubUserId: user.merithubUserId,
      });
    }

    const token = await getMeritHubToken();

    const resp = await axios.post(
      `https://serviceaccount1.meritgraph.com/v1/${process.env.MERITHUB_CLIENT_ID}/users`,
      {
        name: user.full_name,
        clientUserId: user.user_id,
        email: user.email ?? `dummy-${user.user_id}@mail.com`,
        role: user.role === "Teacher" ? "C" : "M", // C = Creator, M = Member
        timeZone: "Asia/Kolkata",
        permission: user.role === "Teacher" ? "CC" : "CJ", // CC = create, CJ = join
        img: "https://hst.meritgraph.com/theme/img/png/avtr.png",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Access token
          "Content-Type": "application/json",
        },
      }
    );

    const meritHubUserId = resp.data.userId;

    await db.user.update({
      where: { user_id: userId },
      data: { merithubUserId: meritHubUserId },
    });

    res.json({ success: true, merithubUserId: meritHubUserId });
  } catch (err: any) {
    console.error("addUserToMeritHub error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
};

/**
 * Schedule a class (Teacher only)
 */
export const scheduleMeritHubClass = async (req: Request, res: Response) => {
  const { sessionId } = req.body;

  try {
    const session = await db.session.findUnique({
      where: { session_id: sessionId },
      include: { teacher: { include: { user: true } }, course: true },
    });
    if (!session) return res.status(404).json({ message: "Session not found" });

    const teacherUser = await db.user.findUnique({
      where: { user_id: session.teacher_id },
    });
    if (!teacherUser?.merithubUserId) {
      return res.status(400).json({ message: "Teacher not registered in MeritHub" });
    }

    const token = await getMeritHubToken();

    const body = {
      title: session.course.course_name,
      description: session.course.course_description ?? "Live class session",
      startTime: new Date(session.schedule_at).toISOString(),
      duration: 60,
      lang: "en",
      timeZoneId: "Asia/Kolkata",
      type: "oneTime",
      access: "private",
      login: false,
      layout: "CR",
      status: "up",
      recording: { record: true, autoRecord: false, recordingControl: true },
      participantControl: { write: false, audio: false, video: false },
    };

    const resp = await axios.post(
      `https://class1.meritgraph.com/v1/${process.env.MERITHUB_CLIENT_ID}/${teacherUser.merithubUserId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Access token
          "Content-Type": "application/json",
        },
      }
    );

    await db.session.update({
      where: { session_id: sessionId },
      data: {
        provider_class_id: resp.data.classId,
        teacher_join_url: resp.data.hostLink,
        student_join_url: resp.data.commonLinks.commonParticipantLink,
      },
    });

    res.json({ success: true, class: resp.data });
  } catch (err: any) {
    if (err.response) {
      console.error("❌ MeritHub API Error:", err.response.data);
      return res.status(err.response.status).json({
        error: err.response.data,
        message: err.message,
      });
    }
    console.error("Internal Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Join a class (Student/Teacher)
 */
export const joinMeritHubClass = async (req: Request, res: Response) => {
  const { sessionId, userId } = req.body;

  try {
    const session = await db.session.findUnique({ where: { session_id: sessionId } });
    const user = await db.user.findUnique({ where: { user_id: userId } });

    if (!session || !session.provider_class_id) {
      return res.status(404).json({ message: "Session not linked to MeritHub" });
    }
    if (!user?.merithubUserId) {
      return res.status(400).json({ message: "User not registered in MeritHub" });
    }

    const token = await getMeritHubToken();

    // ✅ Add user to the class
    const resp = await axios.post(
      `https://class1.meritgraph.com/v1/${process.env.MERITHUB_CLIENT_ID}/${session.provider_class_id}/users`,
      {
        users: [
          {
            userId: user.merithubUserId,   // must be correct MeritHub ID
            userLink:
              user.role === "Teacher"
                ? session.teacher_join_url
                : session.student_join_url,
            userType: "su",
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Join response:", resp.data);

    // Handle both array or object response
    const joinUser = Array.isArray(resp.data) ? resp.data[0] : resp.data.users?.[0];

    if (!joinUser?.userLink) {
      throw new Error("No userLink returned from MeritHub");
    }

    const joinUrl = `https://live.merithub.com/info/room/${process.env.MERITHUB_CLIENT_ID}/${joinUser.userLink}`;

    res.json({ joinUrl });
  } catch (err: any) {
    console.error("joinMeritHubClass error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
};


/**
 * Webhook (MeritHub → Our server)
 */
export const handleMeritHubWebhook = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log("Webhook received:", body);

    if (body.requestType === "classStatus") {
      await db.session.update({
        where: { provider_class_id: body.classId },
        data: { status: body.status === "cp" ? "completed" : "schedule" },
      });
    }

    if (body.requestType === "recording") {
      await db.session.update({
        where: { provider_class_id: body.classId },
        data: { recording_url: body.url },
      });
    }

    res.sendStatus(200);
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    res.status(500).json({ message: err.message });
  }
};


export const getUserClasses = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // 🔹 Fetch sessions where the user is either:
    // - the teacher (via TeachersRoaster)
    // - the enrolled student
    const sessions = await db.session.findMany({
      where: {
        OR: [
          { teacher_id: userId }, // teacher side
          { user_id: userId },    // student side
          { enrollments: { some: { user_id: userId } } } // many-to-many enrollment
        ],
      },
      include: {
        course: true,
        teacher: { include: { user: true } }, // get teacher name
      },
    });

    // 🔹 Format response for frontend
    const formatted = sessions.map((s) => ({
      session_id: s.session_id,
      course_name: s.course.course_name,
      teacher_name: s.teacher.user.full_name,
      schedule_at: s.schedule_at,
      joinUrl: s.student_join_url, // default → join url for students
    }));

    res.json(formatted);
  } catch (err: any) {
    console.error("getUserClasses error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const getTeacherClasses = async (req: Request, res: Response) => {
  const { teacherId } = req.params;

  try {
    const sessions = await db.session.findMany({
      where: { teacher_id: teacherId },
      include: { course: true, teacher: { include: { user: true } } },
      orderBy: { schedule_at: "asc" },
    });

    const result = sessions.map((s) => ({
      session_id: s.session_id,
      course_name: s.course.course_name,
      teacher_name: s.teacher.user.full_name,
      schedule_at: s.schedule_at,
      joinUrl: s.teacher_join_url, // teacher uses host link
    }));

    res.json(result);
  } catch (err: any) {
    console.error(" getTeacherClasses error:", err.message);
    res.status(500).json({ error: err.message });
  }
};



