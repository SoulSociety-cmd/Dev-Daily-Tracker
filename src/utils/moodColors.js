/**
 * Mood color configuration and utilities
 */

export const moodConfig = {
  happy: {
    name: 'Happy',
    emoji: '😊',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    accent: 'bg-yellow-100',
    text: 'text-yellow-700',
    button: 'bg-yellow-400 hover:bg-yellow-500',
  },
  sad: {
    name: 'Sad',
    emoji: '😔',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    accent: 'bg-blue-100',
    text: 'text-blue-700',
    button: 'bg-blue-400 hover:bg-blue-500',
  },
  focused: {
    name: 'Focused',
    emoji: '🎯',
    bg: 'bg-green-50',
    border: 'border-green-200',
    accent: 'bg-green-100',
    text: 'text-green-700',
    button: 'bg-green-400 hover:bg-green-500',
  },
  energetic: {
    name: 'Energetic',
    emoji: '⚡',
    bg: 'bg-red-50',
    border: 'border-red-200',
    accent: 'bg-red-100',
    text: 'text-red-700',
    button: 'bg-red-400 hover:bg-red-500',
  },
  calm: {
    name: 'Calm',
    emoji: '😌',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    accent: 'bg-purple-100',
    text: 'text-purple-700',
    button: 'bg-purple-400 hover:bg-purple-500',
  },
}

/**
 * Get background color class for a given mood
 */
export const getMoodBackground = (mood) => {
  return moodConfig[mood]?.bg || moodConfig.focused.bg
}

/**
 * Get mood emoji
 */
export const getMoodEmoji = (mood) => {
  return moodConfig[mood]?.emoji || '🎯'
}

/**
 * Get all available moods
 */
export const getAllMoods = () => {
  return Object.keys(moodConfig)
}
