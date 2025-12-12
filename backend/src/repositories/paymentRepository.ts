import { PrismaClient, Payment, Enrollment, PaymentStatus, PlanType } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class PaymentRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: {
    user_id: string;
    course_id?: string;
    amount: number;
    currency: string;
    transaction_id: string;
    plan_type : PlanType;
    status: PaymentStatus;
    sales_person_id?: string;
    no_of_session_purchase?: number;
    payment_method?: string;
    receipt?: string;
  }): Promise<Payment> {
    return this.db.payment.create({
      data,
    });
  }

  async findById(paymentId: string): Promise<Payment | null> {
    return this.db.payment.findUnique({
      where: { payment_ID: paymentId },
      include: {
        user: true,
        course: true,
        enrollment: true,
      },
    });
  }

  async createEnrollmentModules(enrollmentId: string, moduleIds: string[],): Promise<void> {
    if (moduleIds.length === 0) return;
    await this.db.enrollmentModule.createMany({
      data: moduleIds.map(id => ({
        enrollment_id: enrollmentId,
        module_id: id,
      })),
    });
  }


  async getEnrolledModuleIds(userId: string, courseId: string): Promise<string[]> {
    const enrollments = await this.db.enrollment.findMany({
      where: {
        user_id: userId,
        course_id: courseId,
        is_active: true,
      },
      include: {
        modules: {
          select: { module_id: true },
        },
      },
    });

    return enrollments.flatMap(e => e.modules.map(m => m.module_id));
  }
  

  async findByTransactionId(transactionId: string): Promise<Payment | null> {
    return this.db.payment.findUnique({
      where: { transaction_id: transactionId },
      include: {
        user: true,
        course: true,
        enrollment: true,
      },
    });
  }

  async updatePaymentStatus(paymentId: string, status: PaymentStatus, refundedAt?: Date): Promise<Payment> {
    return this.db.payment.update({
      where: { payment_ID: paymentId },
      data: {
        status,
        ...(refundedAt && { refunded_at: refundedAt }),
      },
    });
  }

  async checkExistingEnrollment(courseId: string, userId: string): Promise<Enrollment | null> {
    return this.db.enrollment.findFirst({
      where: {
        course_id: courseId,
        user_id: userId,
        is_active: true,
      },
    });
  }

  async getEnrollmentWithPayment(enrollmentId: string, userId: string): Promise<Enrollment & { payment: Payment | null } | null> {
    return this.db.enrollment.findFirst({
      where: {
        enrollment_id: enrollmentId,
        user_id: userId,
      },
      include: {
        payment: true,
      },
    });
  }

  async deleteEnrollment(enrollmentId: string): Promise<void> {
    await this.db.enrollment.delete({
      where: { enrollment_id: enrollmentId },
    });
  }

  async createEnrollment(data: {
    user_id: string;
    course_id: string;
    enrollment_type: 'demo' | 'trial' | 'paid';
    is_active: boolean;
    plan_type?: PlanType;
    slot_id?: number;
    sales_person_id?: string;
  }): Promise<Enrollment> {
    return this.db.enrollment.create({
      data,
    });
  }

  async getPaymentsByUser(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.db.payment.findMany({
        where: { user_id: userId },
        include: {
          course: true,
          enrollment: true,
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.db.payment.count({
        where: { user_id: userId },
      }),
    ]);

    return {
      payments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getPaymentsByCourse(courseId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.db.payment.findMany({
        where: { course_id: courseId },
        include: {
          user: true,
          enrollment: true,
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.db.payment.count({
        where: { course_id: courseId },
      }),
    ]);

    return {
      payments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
