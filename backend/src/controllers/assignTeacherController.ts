
import { Request, Response } from "express";
import { AssignTeacherService } from "../services/assignTeacherService";

;

const service = new AssignTeacherService();

export class AssignTeacherController {
  async assignTeacher(req: Request, res: Response) {
    try {
      const result = await service.assignTeacher(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getCoursesByTeacher(req: Request, res: Response) {
    try {
      const { teacher_id } = req.params;
      if (!teacher_id)
        return res.status(400).json({ success: false, message: "teacher_id is required" });

      const result = await service.getCoursesByTeacher(teacher_id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
