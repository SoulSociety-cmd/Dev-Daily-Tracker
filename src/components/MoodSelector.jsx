import { moodConfig } from '../utils/moodColors'

/**
 * Mood Selector Component
 * Allows users to select their mood and change the app background
 */
export default function MoodSelector({ mood, setMood }) {
  const moods = Object.entries(moodConfig)

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700 hidden sm:block">
        How are you feeling?
      </label>
      <div className="flex gap-2">
        {moods.map(([key, config]) => (
          <button
            key={key}
            onClick={() => setMood(key)}
            title={config.name}
            className={`
              w-10 h-10 rounded-full text-lg transition-all transform
              ${mood === key 
                ? 'ring-2 ring-offset-2 ring-gray-400 scale-110 shadow-lg' 
                : 'hover:scale-105'
              }
            `}
            style={{
              backgroundImage: key === 'happy' 
                ? 'linear-gradient(135deg, #FFE082 0%, #FFD54F 100%)'
                : key === 'sad'
                ? 'linear-gradient(135deg, #90CAF9 0%, #64B5F6 100%)'
                : key === 'focused'
                ? 'linear-gradient(135deg, #A5D6A7 0%, #81C784 100%)'
                : key === 'energetic'
                ? 'linear-gradient(135deg, #EF9A9A 0%, #EF5350 100%)'
                : 'linear-gradient(135deg, #CE93D8 0%, #BA68C8 100%)',
            }}
            aria-label={config.name}
          >
            {config.emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
