import { Check, Flame } from 'lucide-react'
import { getTodayString, formatDate } from '../utils/dateUtils'

/**
 * Daily Check-In Component
 * Allows users to mark that they coded today
 */
export default function DailyCheckIn({ lastCheckInDate, currentStreak, onCheckIn }) {
  const today = getTodayString()
  const alreadyCheckedIn = lastCheckInDate === today

  const handleCheckIn = () => {
    if (!alreadyCheckedIn) {
      onCheckIn()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-500 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Daily Check-In</h2>
          <p className="text-gray-600 text-sm mt-1">
            {alreadyCheckedIn 
              ? `✓ You've already coded today!` 
              : 'Mark that you coded today'}
          </p>
        </div>
        {currentStreak > 0 && (
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
            <Flame className="text-orange-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-orange-500">{currentStreak} days</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleCheckIn}
        disabled={alreadyCheckedIn}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
          alreadyCheckedIn
            ? 'bg-green-100 text-green-700 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg active:scale-95'
        }`}
      >
        <Check size={24} />
        {alreadyCheckedIn ? 'Checked In Today!' : 'I Coded Today'}
      </button>

      {alreadyCheckedIn && (
        <p className="text-center text-green-600 text-sm mt-4 font-medium">
          Great job! Come back tomorrow to keep your streak alive! 🚀
        </p>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Last check-in:</span>{' '}
          {lastCheckInDate ? formatDate(lastCheckInDate) : 'Never'}
        </p>
      </div>
    </div>
  )
}
