"use client";

import { useMemo, useState } from "react";
import { api } from "@/lib/apiClient";
import { useMeQuery } from "@/store/api/authApi";
import { useRouter } from "next/navigation";

// Minimal Razorpay types (no any)
type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler: (response: RazorpayHandlerResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
};

interface RazorpayInstance {
  open: () => void;
  on?: (event: string, cb: (res: unknown) => void) => void;
}

interface Me {
  user_id?: string;
  id?: string;
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
  email?: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

type PlanKey = "quarter" | "half" | "threeQuarter" | "full";

type BuyCourse = {
  id: string;
  title: string;
  highlights: string[];
  price: { monthly: number; currency: "INR" };
};

function loadRazorpayScript() {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById("razorpay-script")) return resolve();
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });
}

const planToServer = (p: PlanKey) =>
  p === "threeQuarter" ? "threequarter" : p; // backend matches .toLowerCase()

const currencyToCountry = (currency?: string) => {
  switch ((currency || "").toUpperCase()) {
    case "INR":
      return "India";
    case "USD":
      return "United States";
    case "AED":
      return "United Arab Emirates";
    case "GBP":
      return "United Kingdom";
    default:
      return "India";
  }
};

function BuyCourseModal({
  open,
  onClose,
  course,
}: {
  open: boolean;
  onClose: () => void;
  course: BuyCourse;
}) {
  const [plan, setPlan] = useState<PlanKey>("half");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter()

  const me = useMeQuery().data as Me | null; // get user
  const userId =
    // adjust to your user type shape
    // Prefer user_id; fallback to id
    me?.user_id ?? me?.id ?? null;

  const multipliers: Record<PlanKey, number> = {
    quarter: 0.25,
    half: 0.5,
    threeQuarter: 0.75,
    full: 1,
  };

  const discountRate = 0.5; // 50% off (as per your screenshot)

  const calc = useMemo(() => {
    const base = Math.round(course.price.monthly * multipliers[plan]);
    const discount = Math.round(base * discountRate);
    const total = Math.max(0, base - discount);
    return { base, discount, total };
  }, [course.price.monthly, plan]);

  const startPayment = async () => {
    try {
      if (!userId) {
        alert("Please log in to continue");
        return;
      }

      setSubmitting(true);
      await loadRazorpayScript();

      // Prepare required fields for backend
      const body = {
        course_id: course.id,
        user_id: userId,
        planType: planToServer(plan),
        countryName: currencyToCountry(course.price.currency),
      };

      // Your backend computes amount/currency; you don't need to send them
      const orderRes = await api.post("/api/payment/capturepayment", body);
      // Expecting shape: { orderId, currency, amount, ... }
      const order = orderRes.data?.data || orderRes.data;

      // Safety: support both orderId and id
      const orderId: string = order.orderId ?? order.id;
      if (!orderId) {
        console.error("Order id missing in response", order);
        alert("Could not create order. Please try again.");
        return;
      }

      const meta = {
      course_id: String(course.id),
      user_id: String(userId),
      planType: planToServer(plan),
      moduleCount: Number(order.moduleCount ?? 0),          // backend included this in the response
      amount: Number(order.amount ?? 0) / 100,              // convert paise -> rupees for your server’s fallback
    };

      const planLabel =
        plan === "threeQuarter"
          ? "3 Quarter"
          : plan === "half"
          ? "Half"
          : plan === "quarter"
          ? "Quarter"
          : "Full";

      const options: RazorpayCheckoutOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: Number(order.amount), // already in paise from backend
        currency: order.currency || course.price.currency,
        name: "YuvaX",
        description: `${course.title} - ${planLabel} plan`,
        order_id: orderId,
        theme: { color: "#10A337" },
        handler: async (response) => {
          try {
            // Prefer using IDs from Razorpay response for verification
            console.log("razorpay payment ID :", response.razorpay_order_id);
            console.log("razorpay payment ID :", response.razorpay_payment_id);
            console.log("razorpay payment ID :", response.razorpay_signature);

            const verifyRes = await api.post("/api/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              ...meta,
            });
            const verify = verifyRes.data?.data || verifyRes.data;
            if (verify?.success ?? verify?.valid) {
              alert("Payment successful! 🎉");
              onClose();
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error(err);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name:
            (me?.first_name || me?.firstName || "") +
            " " +
            (me?.last_name || me?.lastName || ""),
          email: (me)?.email || "student@example.com",
        },
        notes: {
          courseId: course.id,
          userId: String(userId),
          planType: planToServer(plan),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // Optional: handle payment failure
      rzp.on?.("payment.failed", (e) => {
        console.error("Razorpay payment failed", e);
        alert("Oops! Payment failed. Please try again.");
      });

      // router.push('/dasboard/student-dashboard')
    } catch (err) {
      console.error(err);
      alert("Unable to start payment right now.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-7 bg-gradient-to-r from-[#13d0be] to-[#bbdb49] text-white">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-extrabold text-xl md:text-2xl">
                Join This 3-Course Specialization
              </p>
              <p className="text-sm md:text-[15px] opacity-95 max-w-xl">
                Build a strong foundation in Computer Programming with YuvaX&apos;s 3-course program.
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 grid md:grid-cols-2 gap-5">
          {/* Left */}
          <div>
            <p className="font-semibold mb-3">What’s Inside</p>
            <ul className="text-sm text-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
              {course.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#10A337] mt-[3px]">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <p className="font-semibold mt-5 mb-3">Set Your Learning Price</p>
            <div className="flex flex-wrap gap-2">
              {([
                ["quarter", "Quarter"],
                ["half", "Half"],
                ["threeQuarter", "3 Quarter"],
                ["full", "Full"],
              ] as [PlanKey, string][]).map(([k, label]) => {
                const active = plan === k;
                return (
                  <button
                    key={k}
                    onClick={() => setPlan(k)}
                    className={`px-4 py-2 rounded-full border text-sm transition
                    ${active ? "bg-[#10A337] text-white border-[#10A337]" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-xl border p-4 bg-[#E9F7F1]">
              <p className="font-semibold mb-3">Order Summary</p>
              <div className="text-sm flex justify-between">
                <span>Original Price:</span>
                <span>₹ {calc.base.toLocaleString()}</span>
              </div>
              <div className="text-sm flex justify-between text-green-700">
                <span>Discounts (50% Off):</span>
                <span>₹ {calc.discount.toLocaleString()}</span>
              </div>
              <div className="text-base font-semibold flex justify-between mt-3 border-t pt-3">
                <span>Total</span>
                <span>₹ {calc.total.toLocaleString()}</span>
              </div>
            </div>

            <button
              disabled={submitting}
              onClick={startPayment}
              className="mt-4 w-full h-12 rounded-full bg-[#10A337] text-white font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Starting payment..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyCourseModal;