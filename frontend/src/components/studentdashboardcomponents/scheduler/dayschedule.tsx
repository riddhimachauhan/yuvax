"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ScheduleEvent {
  id: string;
  title: string;
  emoji: string;
  startTime: string;
  endTime: string;
  color: "pink" | "purple" | "green";
  position: number;
}

const events: ScheduleEvent[] = [
  {
    id: "1",
    title: "UI/UX Design Class",
    emoji: "😊",
    startTime: "2:00am",
    endTime: "03:00am",
    color: "pink",
    position: 0,
  },
  {
    id: "2",
    title: "Assignment pending",
    emoji: "😔",
    startTime: "2:00am",
    endTime: "03:00am",
    color: "purple",
    position: 2,
  },
  {
    id: "3",
    title: "Group class",
    emoji: "😊",
    startTime: "2:00am",
    endTime: "03:00am",
    color: "purple",
    position: 4,
  },
  {
    id: "4",
    title: "Quiz",
    emoji: "",
    startTime: "2:00am",
    endTime: "03:00am",
    color: "purple",
    position: 6,
  },
  {
    id: "5",
    title: "Class",
    emoji: "😊",
    startTime: "2:00am",
    endTime: "03:00am",
    color: "green",
    position: 6,
  },
];

const timeSlots = [
  "10 am",
  "11 am",
  "12 am",
  "1 pm",
  "2 pm",
  
  
  
];
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getColorClasses = (color: "pink" | "purple" | "green") => {
  switch (color) {
    case "pink":
      return "bg-pink-400";
    case "purple":
      return "bg-indigo-500";
    case "green":
      return "bg-lime-400";
  }
};

const getMonthName = (m: number) =>
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][m];

const getDaysInMonth = (y: number, m: number) =>
  new Date(y, m + 1, 0).getDate();

const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

export function DaySchedule() {
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(1);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(1);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(1);
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlots = Array.from(
    { length: firstDay === 0 ? 6 : firstDay - 1 },
    () => null
  );
  const calendarDays = [...emptySlots, ...dates];

  return (
    <div className="w-90 bg-gradient-to-br from-cyan-400 to-cyan-600 p-4 rounded-3xl">
      {/* Calendar Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {getMonthName(currentMonth)} {currentYear}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={goToPreviousMonth}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={goToNextMonth}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((date, idx) => (
            <div key={idx} className="h-8 flex items-center justify-center">
              {date && (
                <button
                  onClick={() => setSelectedDate(date)}
                  className={`w-8 h-8 text-sm font-medium rounded-full transition-colors ${
                    date === selectedDate
                      ? "bg-cyan-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {date}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="mb-4 text-md font-semibold text-gray-800">
          Schedule for {getMonthName(currentMonth)} {selectedDate},{" "}
          {currentYear}
        </h3>
        <div className="relative">
          {timeSlots.map((time, idx) => (
            <div key={time} className="flex items-start mb-8 last:mb-0">
              <div className="w-16 text-sm text-gray-500 pt-1">{time}</div>
              <div className="flex-1 relative h-10">
                {events
                  .filter((e) => e.position === idx)
                  .map((event, i) => {
                    const gap = 12;
                    const isHighlight = ["1", "2", "3"].includes(event.id);
                    const cardWidth = isHighlight ? 180 : 110;
                    const px = isHighlight ? "px-4" : "px-2";
                    const py = isHighlight ? "py-3" : "py-3";
                    return (
                      <div
                        key={event.id}
                        className={`${getColorClasses(
                          event.color
                        )} text-white rounded-2xl ${px} ${py} shadow-md`}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: `${i * (cardWidth + gap)}px`,
                          width: `${cardWidth}px`,
                        }}
                      >
                        <div className="font-semibold text-xs flex items-center gap-1 leading-tight">
                          {event.title} {event.emoji}
                        </div>
                        <div className="text-xs opacity-90 mt-0.5">
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
