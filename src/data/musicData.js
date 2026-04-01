/**
 * Suggested playlists and tracks for coding sessions
 */

export const musicPlaylists = {
  lofi: {
    name: 'Lofi Hip Hop',
    emoji: '🎧',
    color: 'from-orange-400 to-pink-400',
    tracks: [
      { id: 'lofi-1', name: 'Study Session', artist: 'Lofi Boy' },
      { id: 'lofi-2', name: 'Midnight Coffee', artist: 'Chill Beats' },
      { id: 'lofi-3', name: 'Late Night Vibes', artist: 'Smooth Jazz' },
      { id: 'lofi-4', name: 'Rainy Day', artist: 'Ambient Lofi' },
      { id: 'lofi-5', name: 'Focus Flow', artist: 'Study Buddy' },
    ]
  },
  chill: {
    name: 'Chill & Relaxation',
    emoji: '🌙',
    color: 'from-purple-400 to-blue-400',
    tracks: [
      { id: 'chill-1', name: 'Sunset Breeze', artist: 'Relaxation Music' },
      { id: 'chill-2', name: 'Ocean Waves', artist: 'Nature Sounds' },
      { id: 'chill-3', name: 'Forest Walk', artist: 'Ambient Chill' },
      { id: 'chill-4', name: 'Peaceful Mind', artist: 'Meditation' },
      { id: 'chill-5', name: 'Starlight', artist: 'Dream Music' },
    ]
  },
  focus: {
    name: 'Deep Focus',
    emoji: '⚡',
    color: 'from-green-400 to-blue-400',
    tracks: [
      { id: 'focus-1', name: 'Concentration Boost', artist: 'Focus Music' },
      { id: 'focus-2', name: 'Deep Work', artist: 'Productivity' },
      { id: 'focus-3', name: 'Code Zone', artist: 'Tech Beats' },
      { id: 'focus-4', name: 'Flow State', artist: 'Binaural Beats' },
      { id: 'focus-5', name: 'Locked In', artist: 'Productivity Sounds' },
    ]
  },
  upbeat: {
    name: 'Upbeat Energy',
    emoji: '🚀',
    color: 'from-yellow-400 to-orange-400',
    tracks: [
      { id: 'upbeat-1', name: 'Morning Energy', artist: 'Upbeat Vibes' },
      { id: 'upbeat-2', name: 'Pump It Up', artist: 'Energy Beats' },
      { id: 'upbeat-3', name: 'Let\'s Go', artist: 'Motivation' },
      { id: 'upbeat-4', name: 'Get Moving', artist: 'Uplifting' },
      { id: 'upbeat-5', name: 'Peak Energy', artist: 'Power Tracks' },
    ]
  }
}

/**
 * Get all playlists
 */
export const getAllPlaylists = () => {
  return Object.entries(musicPlaylists).map(([key, playlist]) => ({
    id: key,
    ...playlist
  }))
}

/**
 * Get playlist by id
 */
export const getPlaylistById = (id) => {
  return musicPlaylists[id]
}

/**
 * Get all tracks from all playlists
 */
export const getAllTracks = () => {
  const tracks = []
  Object.values(musicPlaylists).forEach(playlist => {
    tracks.push(...playlist.tracks)
  })
  return tracks
}
