import express from "express";
import { authenticate, authorize } from '../middlewares/authMiddleware';
import {capturePayment, verifyPayment, refundPayment} from "../controllers/razorpayPaymentController";
import { USER_ROLES } from "../utils/constants";

const router = express.Router();


router.post("/capturepayment", authenticate, capturePayment);
router.post("/verify-payment", authenticate, verifyPayment);
router.post('/refund-payment', authenticate, authorize([USER_ROLES.Admin]),refundPayment);

export default router;