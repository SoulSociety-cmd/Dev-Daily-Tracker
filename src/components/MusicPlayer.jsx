import { useState } from 'react'
import { Music, Play, ChevronDown, ChevronUp } from 'lucide-react'
import { getAllPlaylists } from '../data/musicData'

/**
 * Music Player Component
 * Shows playlists and lets users select tracks
 */
export default function MusicPlayer({ selectedTrack, onSelectTrack }) {
  const playlists = getAllPlaylists()
  const [expandedPlaylist, setExpandedPlaylist] = useState(null)

  const togglePlaylist = (playlistId) => {
    setExpandedPlaylist(expandedPlaylist === playlistId ? null : playlistId)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-lg">
          <Music className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Coding Playlists</h3>
          <p className="text-sm text-gray-600">Choose music to keep you focused</p>
        </div>
      </div>

      {/* Playlists */}
      <div className="space-y-3">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Playlist Header */}
            <button
              onClick={() => togglePlaylist(playlist.id)}
              className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                expandedPlaylist === playlist.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{playlist.emoji}</span>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{playlist.name}</p>
                  <p className="text-sm text-gray-600">{playlist.tracks.length} tracks</p>
                </div>
              </div>
              {expandedPlaylist === playlist.id ? (
                <ChevronUp className="text-gray-400" size={20} />
              ) : (
                <ChevronDown className="text-gray-400" size={20} />
              )}
            </button>

            {/* Playlist Tracks */}
            {expandedPlaylist === playlist.id && (
              <div className="border-t border-gray-200 bg-gray-50">
                {playlist.tracks.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => onSelectTrack(track)}
                    className={`
                      w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors
                      ${index !== playlist.tracks.length - 1 ? 'border-b border-gray-200' : ''}
                      ${selectedTrack?.id === track.id ? 'bg-blue-50' : ''}
                    `}
                  >
                    <Play className="text-gray-400" size={16} />
                    <div className="text-left flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{track.name}</p>
                      <p className="text-xs text-gray-600">{track.artist}</p>
                    </div>
                    {selectedTrack?.id === track.id && (
                      <div className="text-blue-500 text-sm font-semibold">Playing</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-sm text-indigo-900">
          <span className="font-semibold">🎵 Music Note:</span> Select a track to show the player at the bottom. Keep your focus while enjoying great music!
        </p>
      </div>
    </div>
  )
}
