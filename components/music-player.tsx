"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface MusicPlayerProps {
  videoUrl: string
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function MusicPlayer({ videoUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(50)
  const [title, setTitle] = useState("Loading...")
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const videoId = extractVideoId(videoUrl)
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : ""

  // Track mount state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update iframe src when videoUrl changes - only on client
  useEffect(() => {
    if (mounted && videoId) {
      setTitle("Now Playing")
      // Set iframe src on client-side only to avoid hydration mismatch
      setIframeSrc(`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&enablejsapi=1&start=23&origin=${window.location.origin}`)
      setIsPlaying(true)
    }
  }, [mounted, videoId, videoUrl])

  const togglePlay = () => {
    if (iframeRef.current?.contentWindow) {
      const action = isPlaying ? "pauseVideo" : "playVideo"
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: action, args: [] }),
        "*"
      )
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (iframeRef.current?.contentWindow) {
      const action = isMuted ? "unMute" : "mute"
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: action, args: [] }),
        "*"
      )
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [newVolume] }),
        "*"
      )
    }
  }

  if (!videoId) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center gap-3 shadow-xl">
        {/* Hidden YouTube iframe - only rendered on client to avoid hydration mismatch */}
        {iframeSrc && (
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            allow="autoplay"
            className="hidden"
          />
        )}

        {/* Thumbnail */}
        <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
          <img
            src={thumbnailUrl}
            alt="Now playing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0 max-w-[120px]">
          <p className="text-xs text-white/60 truncate">YouTube</p>
          <p className="text-sm text-white font-medium truncate">{title}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white/60" />
              ) : (
                <Volume2 className="w-4 h-4 text-white/60" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
