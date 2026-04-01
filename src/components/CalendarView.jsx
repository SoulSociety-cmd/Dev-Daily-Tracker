import { getFirstDayOfMonth, getLastDayOfMonth, getDayName, getMonthName } from '../utils/dateUtils'

/**
 * Calendar View Component
 * GitHub-like contribution calendar showing daily check-ins
 */
export default function CalendarView({ codingDays }) {
  const firstDay = getFirstDayOfMonth()
  const lastDay = getLastDayOfMonth()
  const monthName = getMonthName(firstDay)
  const year = firstDay.getFullYear()

  // Get all days of the month
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Create array of all cells (including empty ones for days before month starts)
  const calendarDays = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  // Function to check if a day has a check-in
  const hasCheckIn = (day) => {
    if (!day) return false
    const dateString = `${year}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return codingDays.includes(dateString)
  }

  // Get color intensity based on consecutive check-ins (bonus feature)
  const getIntensity = (day) => {
    if (!hasCheckIn(day)) return 'bg-gray-100'
    return 'bg-green-500 hover:bg-green-600'
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {monthName} {year} Contributions
      </h3>

      <div className="space-y-4">
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center rounded-md text-sm font-medium
                transition-all duration-200 cursor-default
                ${day === null 
                  ? 'bg-transparent' 
                  : getIntensity(day) + ' text-white'
                }
              `}
              title={day ? `${day} ${monthName}` : ''}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
        <span className="font-semibold">Legend:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded"></div>
          <span className="text-sm">No check-in</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm">Coded today</span>
        </div>
      </div>
    </div>
  )
}
