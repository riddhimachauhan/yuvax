"use client";
import React, { useState, useEffect } from "react";

interface Slot {
  slot_id: number;
  slot_date: string;
  start_time: string;
  end_time: string;
  start_time_local: string;
  end_time_local: string;
  isAvailable: boolean;
}

interface BookDemoPopUpProps {
  courseId: string;
  onClose: () => void;
  onProceed?: (payload: { slotId: number; date: string; start: string; end: string }) => void;
}

const BookDemoPopUp: React.FC<BookDemoPopUpProps> = ({ courseId, onClose, onProceed }) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  const periods = ["🌞 Morning", "🌤️ Afternoon", "🌙 Evening"];

  // ✅ classify slot into morning/afternoon/evening
  const getPeriod = (time: string) => {
    const hour = new Date(time).getHours();
    if (hour < 12) return "🌞 Morning";
    if (hour < 17) return "🌤️ Afternoon";
    return "🌙 Evening";
  };

  // ✅ format to show only time (e.g. "1:30 PM")
  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // fetch slots
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch(
          `https://yuvax-backend-1.onrender.com/slot/getavailableslots?courseId=${courseId}`
        );
        const json = await res.json();
        if (json.success) {
          const availableSlots = json.data.filter((slot: Slot) => slot.isAvailable);
          setSlots(availableSlots);
        }
      } catch (err) {
        console.error("Failed to fetch slots:", err);
      }
    };
    fetchSlots();
  }, [courseId]);

  // group available dates
  const dates = Array.from(new Set(slots.map((s) => s.slot_date.split("T")[0])));

  // slots for selected date
  const slotsForDate = slots.filter((s) => s.slot_date.split("T")[0] === selectedDate);

  // filter slots by morning/afternoon/evening if selectedPeriod chosen
  const filteredSlotsForDate = slotsForDate.filter((slot) => {
    if (!selectedPeriod) return true;
    const period = getPeriod(slot.start_time);
    return period === selectedPeriod;
  });

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg px-6 py-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Lock Your Spot 🚀</h2>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-[#000000] text-xl cursor-pointer"
        >
          ✕
        </button>
      </div>

      <p className="text-[#666666] text-sm mb-6">
        Choose a time that works for you and your champ 👩‍👦
      </p>

      {/* Date Selection */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDate(date);
                setSelectedTime("");
                setSelectedPeriod("");
              }}
              className={`px-3 py-2 rounded-full text-sm border ${
                selectedDate === date
                  ? "bg-[#1CA672] text-white border-[#1CA672]"
                  : "bg-white text-[#000000] border-[#1CA672] hover:border-green-500"
              }`}
            >
              {new Date(date).toDateString()}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="space-y-2">
          <div>
            <h3 className="font-medium mb-3 text-[#111111] text-md">
              Your Slot, Your Time ⏰
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              One hour, all yours to explore & learn 🌟
            </p>
          </div>

          {/* Period Filter */}
          <div className="flex gap-2 mb-2 border border-[#CCCCCC] rounded-full max-w-fit">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-1.5 py-1.5 lg:px-4 lg:py-3 rounded-full text-sm border ${
                  selectedPeriod === period
                    ? "bg-[#1CA672] text-white border-[#1CA672]"
                    : "bg-white text-[#000000] border-transparent hover:border-green-500"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Slot times with flex wrap for mobile */}
          <div className="mb-4 py-1">
            <div className="flex flex-wrap gap-2">
              {filteredSlotsForDate.length === 0 ? (
                <p className="text-sm text-gray-500">No slots available</p>
              ) : (
                filteredSlotsForDate.map((slot) => (
                  <button
                    key={slot.slot_id}
                    onClick={() => setSelectedTime(slot.start_time_local)}
                    className={`px-3 py-2 rounded-full text-sm border ${
                      selectedTime === slot.start_time_local
                        ? "bg-[#1CA672] text-white border-[#1CA672]"
                        : "bg-white text-[#000000] border-[#1CA672] hover:border-green-500"
                    }`}
                  >
                    {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Timezone */}
          <div className="mt-2 text-start">
            <span className="text-md text-gray-500">
              Time Zone:{" "}
              <span className="font-medium text-black">Asia/Kolkata</span>
            </span>
          </div>

          {/* Book Button */}
          <button
            disabled={!selectedTime}
            className="w-full mt-6 py-2 bg-[#1CA672] text-white rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => {
              if (!selectedTime) return;
              const chosenSlot = filteredSlotsForDate.find(
                (s) => s.start_time_local === selectedTime
              );
              if (chosenSlot) {
                onProceed?.({
                  slotId: chosenSlot.slot_id,
                  date: chosenSlot.slot_date,
                  start: chosenSlot.start_time_local,
                  end: chosenSlot.end_time_local,
                });
              }
            }}
          >
            Continue & Book Your Slot
          </button>
        </div>
      )}
    </div>
  );
};

export default BookDemoPopUp;