import { X } from "lucide-react";
import Image from "next/image";
import ConfirmStars from "@/assets/congrats.svg";

interface ConfirmBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmBooking = ({ isOpen, onClose }: ConfirmBookingProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-2 z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Star icon */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">
            <Image
              src={ConfirmStars}
              alt="Celebration stars"
              width={106}
              height={106}
              className="mx-auto mb-4 w-30 h-30 object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-[#111111] mb-2">
            You’re All Set for the Demo! 🌟
          </h2>
          <p className="text-[#666666] text-sm">
            We’re setting everything up for an exciting first class ✨
          </p>
        </div>

        {/* Demo details card */}
        <div className="bg-green-50 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-[#111111] mb-3">
            Demo Class Details
          </h3>

          <div className="flex items-center gap-3 mb-3">
            <div className="text-red-500">📅</div>
            <div>
              <div className="font-medium text-[#111111]">
                Friday, September 2025
              </div>
              <div className="text-sm text-[#666666]">7:00 AM - 8:00 AM</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-orange-500">🔑</div>
            <div>
              <div className="font-medium text-[#111111]">
                Login via yuvax.com
              </div>
              <div className="text-sm text-[#666666]">
                Login credentials will be shared soon
              </div>
            </div>
          </div>
        </div>

        {/* Steps ahead card */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-[#111111] mb-3">Steps Ahead ✨</h3>
          <ul className="text-sm text-[#666666] space-y-1">
            <li>• Our expert tutors are lining up for your child`s trial</li>
            <li>• Watch your inbox - we`ll send class details shortly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
