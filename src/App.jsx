import { useState, useEffect } from 'react'
import DailyCheckIn from './components/DailyCheckIn'
import CalendarView from './components/CalendarView'
import StatsDashboard from './components/StatsDashboard'
import GoalsSection from './components/GoalsSection'
import MusicPlayer from './components/MusicPlayer'
import MoodSelector from './components/MoodSelector'
import { useDailyTracker } from './hooks/useDailyTracker'
import { getMoodBackground } from './utils/moodColors'

function App() {
  const {
    codingDays,
    currentStreak,
    longestStreak,
    checkInToday,
    lastCheckInDate,
  } = useDailyTracker()
  
  const [mood, setMood] = useState(localStorage.getItem('currentMood') || 'focused')
  const [selectedTrack, setSelectedTrack] = useState(null)

  useEffect(() => {
    localStorage.setItem('currentMood', mood)
  }, [mood])

  const backgroundColor = getMoodBackground(mood)

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${backgroundColor}`}
    >
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Dev Daily Tracker</h1>
              <p className="text-gray-600 mt-1">Track your coding consistency and build streaks</p>
            </div>
            <MoodSelector mood={mood} setMood={setMood} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Check-in and Calendar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Check-In */}
            <DailyCheckIn 
              lastCheckInDate={lastCheckInDate}
              currentStreak={currentStreak}
              onCheckIn={checkInToday}
            />

            {/* Calendar */}
            <CalendarView codingDays={codingDays} />
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <StatsDashboard
              totalCodingDays={codingDays.length}
              currentStreak={currentStreak}
              longestStreak={longestStreak}
            />
            
            <GoalsSection currentStreak={currentStreak} />
          </div>
        </div>

        {/* Music Player Section */}
        <MusicPlayer 
          selectedTrack={selectedTrack}
          onSelectTrack={setSelectedTrack}
        />
      </main>

      {/* Fixed Music Player at Bottom */}
      {selectedTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">♪</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{selectedTrack.name}</p>
                  <p className="text-sm text-gray-600">{selectedTrack.artist}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrack(null)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Stop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
