"use client"

import { Navbar } from "@/components/navbar"
import { MusicPlayer } from "@/components/music-player"
import { SnowEffect } from "@/components/snow-effect"
import { archiveVideos } from "@/lib/members"
import { Play } from "lucide-react"
import { useState } from "react"

export default function ArchivePage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-black text-white">
      <SnowEffect />
      <Navbar />

      <main className="relative pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider">
              Archive
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              Collection of DAW videos and highlights
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {archiveVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video.id)}
                className="group relative aspect-video bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white/20"
              >
                <img
                  src={video.thumbnail && video.thumbnail.length > 0 ? video.thumbnail : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium text-left">{video.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
            >
              Close
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              className="w-full h-full rounded-xl"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <MusicPlayer videoUrl="https://www.youtube.com/watch?v=l5r8xViCg_M" />
    </div>
  )
}
