import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Award, TrendingUp, Calendar } from 'lucide-react'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

/**
 * Statistics Dashboard Component
 * Shows overall progress and includes charts
 */
export default function StatsDashboard({ totalCodingDays, currentStreak, longestStreak }) {
  const [chartType, setChartType] = useState('weekly')
  const [weeklyData, setWeeklyData] = useState(null)
  const [monthlyData, setMonthlyData] = useState(null)

  // Generate weekly data (last 7 days)
  useEffect(() => {
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Coding Hours',
          data: [2, 3, 1.5, 4, 2.5, 3.5, 2],
          backgroundColor: 'rgba(34, 197, 94, 0.6)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    }
    setWeeklyData(data)
  }, [])

  // Generate monthly data (last 4 weeks)
  useEffect(() => {
    const data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Total Coding Days',
          data: [5, 6, 4, 5],
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    }
    setMonthlyData(data)
  }, [])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: ['weekly'].includes(chartType) ? 5 : 7,
      },
    },
  }

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Coding Days */}
        <div className="bg-white rounded-lg shadow-md p-4 border-t-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Coding Days</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalCodingDays}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="bg-white rounded-lg shadow-md p-4 border-t-4 border-purple-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Longest Streak</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{longestStreak}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Current Streak - Full Width */}
        <div className="col-span-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg shadow-md p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Current Streak</p>
              <p className="text-3xl font-bold mt-1">{currentStreak} days</p>
            </div>
            <div className="text-5xl">🔥</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Activity Chart</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('weekly')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                chartType === 'weekly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setChartType('monthly')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                chartType === 'monthly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="h-64">
          {chartType === 'weekly' && weeklyData && (
            <Bar data={weeklyData} options={chartOptions} />
          )}
          {chartType === 'monthly' && monthlyData && (
            <Line data={monthlyData} options={chartOptions} />
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-500 text-white rounded-full p-2 flex-shrink-0">
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="font-semibold text-blue-900">Keep it up!</p>
            <p className="text-sm text-blue-700 mt-1">
              {currentStreak > 0
                ? `You're on a ${currentStreak}-day streak! Don't break it!`
                : 'Start your first streak by coding today!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
