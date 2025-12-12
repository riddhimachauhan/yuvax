import { Request, Response } from "express";
import { DyteClassService } from "../services/dyteClassService";

const dyteClassService = new DyteClassService();

export const startDyteClass = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  try {
    const result = await dyteClassService.startClass(sessionId);
    return res.status(result.status).json(result.body);
  } catch (err: any) {
    console.error("Start Dyte Class Error:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
  }
};

export const joinDyteClass = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { userId, role } = req.body as { userId: string; role: "teacher" | "student" };
  try {
    const result = await dyteClassService.joinClass(sessionId, userId, role);
    return res.status(result.status).json(result.body);
  } catch (err: any) {
    console.error("Join Dyte Class Error:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
  }
};
