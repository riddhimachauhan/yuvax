import { ChevronLeft, ChevronRight } from "lucide-react"

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const dates = [1, 2, 3, 4, 5, 6, 7]

export function CalendarHeader() {
  return (
    <div className="w-80 bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">September 2025</h2>
        <div className="flex gap-2">
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
        {dates.map((date) => (
          <div
            key={date}
            className={`text-center py-2 text-sm font-medium rounded-full ${
              date === 5 ? "bg-cyan-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  )
}
