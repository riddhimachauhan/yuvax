import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { PaymentCaptureRequest } from '../dto/request/paymentRequest';
import { CourseRepository } from '../repositories/courseRepository';
import { CountryRepository } from '../repositories/countryRepository';
import { PaymentRepository } from '../repositories/paymentRepository';
import { instance } from '../lib/razorpay';
import crypto from 'crypto';
import { PaymentVerificationRequest } from '../dto/request/paymentRequest';


const paymentService = new PaymentService();
const courseRepository = new CourseRepository();
const countryRepository = new CountryRepository();
const paymentRepository = new PaymentRepository();

export const capturePayment = async (request: Request, res: Response) => {
  const { course_id, user_id, planType, countryName } = request.body;
  // console.log("course_id", course_id);
  // console.log("user_id", user_id);
  // console.log("planType", planType);
  // console.log("countryName", countryName);

  // 1. Load course and modules
  const course = await courseRepository.findByIdWithRelations(course_id);
  if (!course || !course.modules) throw new CustomError('Course not found', HTTP_STATUS.NOT_FOUND);

  const totalModules = course.modules.length;
  if (totalModules === 0) throw new CustomError('Course has no modules', HTTP_STATUS.BAD_REQUEST);

  // 2. Determine requested module count from plan
  let factor = 1;
  switch (planType.toLowerCase()) {
    case "quarter": factor = 0.25; break;
    case "half": factor = 0.5; break;
    case "3quarter":
    case "threequarter":
    case "three_quarter":
      factor = 0.75; break;
    case "full":
    default: factor = 1; break;
  }
  const requestedModuleCount = Math.ceil(totalModules * factor);

  // 3. Find modules user already has for this course (so we don't resell)
  const alreadyModuleIds = await paymentRepository.getEnrolledModuleIds(user_id, course_id);
  const remainingModules = course.modules.filter(m => !alreadyModuleIds.includes(m.module_id));

  if (remainingModules.length === 0) {
    throw new CustomError('No remaining modules available to purchase for this user', HTTP_STATUS.BAD_REQUEST);
  }

  // 4. Final module count to sell now
  const moduleCount = Math.min(requestedModuleCount, remainingModules.length);

  // 5. Choose which modules to sell (take first N of remainingModules)
  const selectedModules = remainingModules.slice(0, moduleCount).map(m => m.module_id);

  // 6. Resolve pricing for the country
  const countryPricing = await countryRepository.findByCountryName(countryName);
  if (!countryPricing) throw new CustomError('Price not available', HTTP_STATUS.NOT_FOUND);

  const pricing = await countryRepository.getCoursePricingByCountry(countryPricing.country_id, course.course_id);
  const fullAmount = pricing?.current_price ?? pricing?.discounted_price ?? pricing?.base_price ?? 0;

  // 7. Price per module (proportional) then total for selected modules
  const amount = (Number(fullAmount) / totalModules) * moduleCount;
  const currency = countryPricing.currency || pricing?.currency || 'INR';

  // 8. Create Razorpay order. Put selectedModules (stringified) into notes so verify can read it.
  const options = {
    amount: Math.round(Number(amount) * 100), // paise
    currency,
    receipt: Math.random().toString().substring(2),
    notes: {
      courseId: course_id,
      userId: user_id,
      planType,
      moduleCount: String(moduleCount),
      selectedModules: JSON.stringify(selectedModules),
    },
  };

  const order = await instance.orders.create(options);

  // 9. Return order info + meta (frontend does not need to send selectedModules back, verify will read notes)
  return res.status(200).json({
    success: true,
    data: {
      orderId: order.id,           // frontend expects this
      currency: order.currency,
      amount: order.amount,        // paise
      planType,
      moduleCount,
      selectedModules,
    },
  });
}

export const verifyPayment = async (request: Request, res: Response) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    course_id,
    user_id,
    planType,
    moduleCount,
    amount = 0,
  } = request.body;

  

  console.log("razorpay_order_id", razorpay_order_id);
  console.log("razorpay_payment_id", razorpay_payment_id);
  console.log("razorpay_signature", razorpay_signature);
  console.log("course_id", course_id);
  console.log("user_id", user_id);
  console.log("planType", planType);
  console.log("moduleCount", moduleCount);
  console.log("amount", amount);

  // 1. Verify signature
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET as string).update(body).digest("hex");
  if (expected !== razorpay_signature) {
    throw new CustomError("Payment verification failed: signature mismatch", HTTP_STATUS.BAD_REQUEST);
  }

  // 2. Fetch the order from Razorpay to get notes we stored (selectedModules etc.)
  const orderDetails = await instance.orders.fetch(razorpay_order_id);
  const notes = orderDetails?.notes || {};
  let selectedModules: string[] = [];
  try {
    if (typeof notes.selectedModules === "string" && notes.selectedModules.trim()) {
      selectedModules = JSON.parse(notes.selectedModules) as string[];
    } else if (moduleCount && moduleCount > 0) {
      // fallback: recalc selected modules server-side
      const course = await courseRepository.findByIdWithRelations(String(course_id));
      const alreadyModuleIds = await paymentRepository.getEnrolledModuleIds(String(user_id), String(course_id));

      const remainingModules = (course?.modules || []).filter(
        (m) => !alreadyModuleIds.includes(m.module_id)
      );

      // moduleCount is guaranteed to be number here
      selectedModules = remainingModules.slice(0, moduleCount).map((m) => m.module_id);
    } else {
      // keep selectedModules as empty array
      selectedModules = [];
    }
  } catch (err) {
    // parse error fallback
    selectedModules = [];
  }

  // use amount from orderDetails if not provided
  const paidAmount = (orderDetails?.amount ? Number(orderDetails.amount) / 100 : amount) || 0;
  const paidCurrency = orderDetails?.currency || 'INR';

  // 3. Save payment record
  const payment = await paymentRepository.create({
    user_id,
    course_id,
    amount: paidAmount,
    currency: paidCurrency,
    transaction_id: razorpay_payment_id,
    status: "Paid",
    plan_type: (planType as any) || undefined,
  });

  // 4. Create or reuse enrollment
  let enrollment = await paymentRepository.checkExistingEnrollment(course_id, user_id);
  if (!enrollment) {
    enrollment = await paymentRepository.createEnrollment({
      user_id,
      course_id,
      enrollment_type: "paid",
      plan_type: (planType as any) || undefined,
      is_active: true,
    });
  } else {
    // optionally update plan_type on existing enrollment
    // await this.paymentRepository.updateEnrollmentPlanType(enrollment.enrollment_id, planType)
  }

  // 5. Create EnrollmentModule rows only for selectedModules that are not already present
  if (selectedModules && selectedModules.length > 0) {
    // fetch already assigned modules again to avoid duplicates
    const alreadyAssigned = await paymentRepository.getEnrolledModuleIds(user_id, course_id);
    const toInsert = selectedModules.filter(m => !alreadyAssigned.includes(m));

    if (toInsert.length > 0) {
      await paymentRepository.createEnrollmentModules(enrollment.enrollment_id, toInsert);
    }
  }

  return {
    message: `Payment verified. Enrolled in ${planType || "full"} plan covering ${selectedModules.length} modules.`,
    payment_id: payment.payment_ID,
  };
}

export const refundPayment = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const { paymentId, enrollmentId } = req.body;
    const userId = req.user.user_id;

    if (!paymentId || !enrollmentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID and Enrollment ID are required for refund.',
      });
    }

    const result = await paymentService.refundPayment({
      paymentId,
      enrollmentId,
      user_id: userId,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
      refund_id: result.refund_id,
    });
  } catch (error: any) {
    console.error('Refund Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Could not process refund. An unexpected error occurred.',
    });
  }
};

export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.user_id;

    const result = await paymentService.getPaymentHistory({
      user_id: userId,
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('Get Payment History Error:', error);
    
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Could not fetch payment history. An unexpected error occurred.',
    });
  }
};