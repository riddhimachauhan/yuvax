import { validateRequest } from "../middlewares/validationMiddleware";

export const assignTeacherValidator = validateRequest([
  { field: "course_id", required: true, type: "string" },
  { field: "teacher_ids", required: true, type: "array" }, // ✅ updated field name and type
]);
