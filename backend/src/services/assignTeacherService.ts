import { AssignTeacherRepository } from "../repositories/assignTeacherRepository";
import { AssignTeacherRequest } from "../dto/request/assignTeacherRequest";
import { AssignTeacherResponse } from "../dto/response/assignTeacherResponse";



export class AssignTeacherService {
  private repository = new AssignTeacherRepository();

  async assignTeacher(request: AssignTeacherRequest): Promise<AssignTeacherResponse> {
    const { course_id, teacher_ids } = request;

    if (!teacher_ids || teacher_ids.length === 0)
      throw new Error("At least one teacher_id is required");

    const course = await this.repository.getCourseById(course_id);
    if (!course) throw new Error("Course not found");

    const updatedCourse = await this.repository.assignTeachersToCourse(course_id, teacher_ids);

    return {
      success: true,
      message: "Teachers assigned successfully",
      data: {
        course_id: updatedCourse.course_id,
        teacher_ids: updatedCourse.teachers.map((t) => t.teacher_id),
      },
    };
  }

  async getCoursesByTeacher(teacher_id: string) {
    const courses = await this.repository.getCoursesByTeacher(teacher_id);
    return {
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    };
  }
}
