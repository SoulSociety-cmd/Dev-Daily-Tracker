/**
 * Date utilities for the tracker
 */

/**
 * Get the first day of the current month
 */
export const getFirstDayOfMonth = () => {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), 1)
}

/**
 * Get the last day of the current month
 */
export const getLastDayOfMonth = () => {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth() + 1, 0)
}

/**
 * Get all dates in the current month
 */
export const getDatesInMonth = () => {
  const firstDay = getFirstDayOfMonth()
  const lastDay = getLastDayOfMonth()
  const dates = []

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), i)
    dates.push(date.toISOString().split('T')[0])
  }

  return dates
}

/**
 * Get the day of the week name
 */
export const getDayName = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[new Date(date).getDay()]
}

/**
 * Get the month name
 */
export const getMonthName = (date) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[new Date(date).getMonth()]
}

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return d1.toISOString().split('T')[0] === d2.toISOString().split('T')[0]
}

/**
 * Get the current date as YYYY-MM-DD
 */
export const getTodayString = () => {
  return new Date().toISOString().split('T')[0]
}

/**
 * Format date string to readable format
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
