import { useState, useEffect } from 'react'

/**
 * Custom hook for managing daily tracker data in localStorage
 * Tracks coding days, streaks, and provides check-in functionality
 */
export const useDailyTracker = () => {
  const [codingDays, setCodingDays] = useState([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [lastCheckInDate, setLastCheckInDate] = useState(null)

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('codingDays')
    const days = stored ? JSON.parse(stored) : []
    setCodingDays(days)
    calculateStreaks(days)
    
    // Check if already checked in today
    const today = new Date().toISOString().split('T')[0]
    if (days.includes(today)) {
      setLastCheckInDate(today)
    }
  }, [])

  // Calculate current and longest streaks
  const calculateStreaks = (days) => {
    if (days.length === 0) {
      setCurrentStreak(0)
      setLongestStreak(0)
      return
    }

    // Sort days in descending order
    const sortedDays = [...days].sort().reverse()
    
    let maxStreak = 1
    let tempStreak = 1
    let currentStreakCount = 0
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    // Check if today or yesterday was a check-in day
    if (sortedDays[0] === today.toISOString().split('T')[0] || 
        sortedDays[0] === yesterdayStr) {
      currentStreakCount = 1
    }

    // Calculate streaks
    for (let i = 0; i < sortedDays.length - 1; i++) {
      const currentDate = new Date(sortedDays[i])
      const nextDate = new Date(sortedDays[i + 1])
      const diffDays = (currentDate - nextDate) / (1000 * 60 * 60 * 24)

      if (diffDays === 1) {
        tempStreak++
        if (i === 0) currentStreakCount = tempStreak
        maxStreak = Math.max(maxStreak, tempStreak)
      } else {
        tempStreak = 1
      }
    }

    // If the first day (most recent) is today or yesterday, it's the current streak
    if (sortedDays[0] === today.toISOString().split('T')[0]) {
      // Calculate current streak from today backwards
      currentStreakCount = 1
      for (let i = 0; i < sortedDays.length - 1; i++) {
        const currentDate = new Date(sortedDays[i])
        const nextDate = new Date(sortedDays[i + 1])
        const diffDays = (currentDate - nextDate) / (1000 * 60 * 60 * 24)
        if (diffDays === 1) {
          currentStreakCount++
        } else {
          break
        }
      }
    } else if (sortedDays[0] === yesterdayStr) {
      // If most recent is yesterday, still count as current streak
      currentStreakCount = 1
      for (let i = 0; i < sortedDays.length - 1; i++) {
        const currentDate = new Date(sortedDays[i])
        const nextDate = new Date(sortedDays[i + 1])
        const diffDays = (currentDate - nextDate) / (1000 * 60 * 60 * 24)
        if (diffDays === 1) {
          currentStreakCount++
        } else {
          break
        }
      }
    } else {
      currentStreakCount = 0
    }

    setCurrentStreak(currentStreakCount)
    setLongestStreak(maxStreak)
  }

  // Add today's date to coding days
  const checkInToday = () => {
    const today = new Date().toISOString().split('T')[0]
    
    if (!codingDays.includes(today)) {
      const newDays = [...codingDays, today]
      setCodingDays(newDays)
      localStorage.setItem('codingDays', JSON.stringify(newDays))
      calculateStreaks(newDays)
    }
    
    setLastCheckInDate(today)
  }

  return {
    codingDays,
    currentStreak,
    longestStreak,
    lastCheckInDate,
    checkInToday,
  }
}
