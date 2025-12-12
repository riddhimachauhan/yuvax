import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class AssignTeacherRepository {
  async getCourseById(course_id: string) {
    return prisma.course.findUnique({
      where: { course_id },
      include: { teachers: true },
    });
  }

  async assignTeachersToCourse(course_id: string, teacher_ids: string[]) {
    return prisma.course.update({
      where: { course_id },
      data: {
        teachers: {
          set: [], // clears existing teachers first
          connect: teacher_ids.map((id) => ({ teacher_id: id })),
        },
      },
      include: { teachers: true },
    });
  }

  async getCoursesByTeacher(teacher_id: string) {
  return prisma.course.findMany({
    where: {
      teachers: {
        some: { teacher_id },
      },
    },
    select: {
      course_id: true,
      course_name: true,
    },
  });
}

}
