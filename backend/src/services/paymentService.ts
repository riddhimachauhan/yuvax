import { PaymentRepository } from '../repositories/paymentRepository';
import { CourseRepository } from '../repositories/courseRepository';
import { UserRepository } from '../repositories/userRepository';
import { CountryRepository } from '../repositories/countryRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { instance } from '../lib/razorpay';
import { PlanType } from '@prisma/client'
import crypto from "crypto"

export interface PaymentCaptureRequest {
  course_id: string;
  user_id: string;
}

export interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  course_id: string;
  user_id: string;
}

export interface RefundRequest {
  paymentId: string;
  enrollmentId: string;
  user_id: string;
}

export interface PaymentHistoryRequest {
  user_id: string;
  page: number;
  limit: number;
}

export class PaymentService {
  private paymentRepository: PaymentRepository;
  private courseRepository: CourseRepository;
  private userRepository: UserRepository;
  private countryRepository: CountryRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.courseRepository = new CourseRepository();
    this.userRepository = new UserRepository();
    this.countryRepository = new CountryRepository();
  }

  async capturePayment(request: PaymentCaptureRequest & { planType: string, countryName: string }) {
    const { course_id, user_id, planType, countryName } = request;
    console.log("request is :", request)

    // Load course and modules
    const course = await this.courseRepository.findByIdWithRelations(course_id);
    if (!course || !course.modules) throw new CustomError('Course not found', HTTP_STATUS.NOT_FOUND);

    // console.log("course is : ", course)
    const totalModules = course.modules.length;
    // console.log("course module length is :", totalModules)

    // Figure out how many modules this plan covers
    let factor = 1;
    switch (planType.toLowerCase()) {
      case "quarter":
        factor = 0.25;
        break;
      case "half":
        factor = 0.5;
        break;
      case "3quarter":
        factor = 0.75;
        break;
      case "full":
      default:
        factor = 1;
        break;
    }

    const moduleCount = Math.ceil(totalModules * factor);

    // Pricing logic: proportional cost
    const countryPricing = await this.countryRepository.findByCountryName(countryName);

    // console.log("country price :", countryPricing)

    if (!countryPricing) throw new CustomError('Price not available', HTTP_STATUS.NOT_FOUND);

    // Use CoursePricing table for price resolution
    const pricing = await this.countryRepository.getCoursePricingByCountry(countryPricing.country_id, course.course_id);
    const fullAmount = pricing?.current_price ?? pricing?.discounted_price ?? pricing?.base_price ?? 0;

    // console.log("full amount :", fullAmount)

    const amount = (Number(fullAmount) / totalModules) * moduleCount;

    // console.log("got amount :", amount)

    const currency = countryPricing.currency;

    // Razorpay Order Creation
    const options = {
      amount: Number(amount) * 100,
      currency,
      receipt: Math.random().toString().substring(2),
      notes: { courseId: course_id, userId: user_id, planType, moduleCount },
    };

    const paymentResponse = await instance.orders.create(options);

    return {
      courseName: course.course_name,
      courseDescription: course.course_description,
      thumbnail: course.course_image,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
      planType,
      moduleCount
    };
  }

  async verifyPayment(
    request: PaymentVerificationRequest & {
      planType?: string;
      moduleCount?: number;
      amount?: number;
    }
  ) {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      course_id,
      user_id,
      planType,
      moduleCount,
      amount = 0,
    } = request;
    console.log("request is : ", request)

    // 1️⃣ Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET as string)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      throw new CustomError(
        "Payment verification failed: signature mismatch",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // 2️⃣ Record payment with actual amount
    const payment = await this.paymentRepository.create({
      user_id,
      course_id,
      amount,
      currency: "INR",
      transaction_id: razorpay_payment_id,
      status: "Paid",
      plan_type: planType as PlanType,
    });
    console.log("✅ Payment saved:", payment.payment_ID);

    // 3️⃣ Create Enrollment
    const enrollment = await this.paymentRepository.createEnrollment({
      user_id,
      course_id,
      enrollment_type: "paid",
      plan_type: planType as PlanType,
      is_active: true,
    });
    console.log("✅ Enrollment created:", enrollment.enrollment_id);

    // 4️⃣ Create Enrollment‑Module rows
    console.log("module is :", moduleCount)
    if (moduleCount && moduleCount > 0) {
      console.log("aur yha aa rha")
      const course = await this.courseRepository.findByIdWithRelations(course_id);
      if (!course?.modules?.length)
        throw new CustomError("Course has no modules", HTTP_STATUS.BAD_REQUEST);

      // Choose modules for plan
      const selectedModules = course.modules
        .slice(0, moduleCount)
        .map((m) => m.module_id);
      
        console.log("yha aa rha selected modules")

      await this.paymentRepository.createEnrollmentModules(
        enrollment.enrollment_id,
        selectedModules
      );

      console.log("✅ EnrollmentModules created:", selectedModules.length);
    }

    return {
      message: `Payment verified. Enrolled in ${
        planType || "full"
      } plan covering ${moduleCount} modules.`,
      payment_id: payment.payment_ID,
    };
  }


  async refundPayment(request: RefundRequest) {
    const { paymentId, enrollmentId, user_id } = request;

    // Get enrollment and verify ownership
    const enrollment = await this.paymentRepository.getEnrollmentWithPayment(enrollmentId, user_id);
    if (!enrollment) {
      throw new CustomError('Enrollment not found or does not belong to this user', HTTP_STATUS.NOT_FOUND);
    }

    if (!enrollment.payment || enrollment.payment.status !== 'Paid') {
      throw new CustomError('Payment is not in a refundable state', HTTP_STATUS.BAD_REQUEST);
    }

    // Process Razorpay refund
    const razorpayRefund = await instance.payments.refund(paymentId, {});

    // Update payment status
    await this.paymentRepository.updatePaymentStatus(paymentId, 'Refund', new Date());

    // Delete enrollment
    await this.paymentRepository.deleteEnrollment(enrollmentId);

    return {
      message: 'Payment refunded and enrollment cancelled successfully',
      refund_id: razorpayRefund.id,
    };
  }

  private async enrollStudent(courseId: string, userId: string) {
    // This would typically be handled by an enrollment service
    // For now, we'll create a basic enrollment
    return await this.paymentRepository.createEnrollment({
      user_id: userId,
      course_id: courseId,
      enrollment_type: 'paid',
      is_active: true,
    });
  }

  async getPaymentHistory(request: PaymentHistoryRequest) {
    const { user_id, page, limit } = request;

    return await this.paymentRepository.getPaymentsByUser(user_id, page, limit);
  }

  private getPriceColumnKey(categoryName: string): string {
    return categoryName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)?/g, (match, chr) =>
      chr ? chr.toUpperCase() : ''
    ).replace(/^./, (match) => match.toLowerCase());
  }
}
