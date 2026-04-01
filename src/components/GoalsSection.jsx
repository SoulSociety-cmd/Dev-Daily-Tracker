import { useState } from 'react'
import { Target, CheckCircle } from 'lucide-react'

/**
 * Goals Section Component
 * Allows users to set and track goals
 */
export default function GoalsSection({ currentStreak }) {
  const [goal, setGoal] = useState(localStorage.getItem('dailyGoal') || 30)
  const [isEditing, setIsEditing] = useState(false)
  const [tempGoal, setTempGoal] = useState(goal)

  const handleSaveGoal = () => {
    const newGoal = parseInt(tempGoal)
    if (newGoal > 0) {
      setGoal(newGoal)
      localStorage.setItem('dailyGoal', newGoal)
      setIsEditing(false)
    }
  }

  const progressPercentage = Math.min((currentStreak / goal) * 100, 100)
  const goalReached = currentStreak >= goal

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="text-blue-500" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Today's Goal</h3>
        </div>
        {goalReached && (
          <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
            <CheckCircle size={16} /> Goal Reached!
          </div>
        )}
      </div>

      {/* Goal Display or Edit */}
      {isEditing ? (
        <div className="space-y-3 mb-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Streak Goal (days)</span>
            <input
              type="number"
              min="1"
              max="365"
              value={tempGoal}
              onChange={(e) => setTempGoal(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleSaveGoal}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Save Goal
            </button>
            <button
              onClick={() => {
                setTempGoal(goal)
                setIsEditing(false)
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-3xl font-bold text-gray-900">{goal} days</p>
            <button
              onClick={() => {
                setTempGoal(goal)
                setIsEditing(true)
              }}
              className="text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              Edit
            </button>
          </div>
          <p className="text-sm text-gray-600">Your streak goal</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Progress</span>
          <span className="font-semibold text-gray-900">
            {currentStreak}/{goal} days
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 text-right">
          {goal - currentStreak > 0
            ? `${goal - currentStreak} more days to go!`
            : 'You\'ve reached your goal! 🎉'}
        </p>
      </div>

      {/* Milestone Info */}
      <div className="bg-blue-100 rounded-lg border border-blue-300">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">💡 Tip:</span> Consistent daily coding builds strong habits. Keep pushing!
        </p>
      </div>
    </div>
  )
}
