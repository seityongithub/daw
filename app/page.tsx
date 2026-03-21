"use client"

import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { MusicPlayer } from "@/components/music-player"
import { SnowEffect } from "@/components/snow-effect"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SnowEffect />
      <Navbar />

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto animate-fade-in">
          {/* Logo */}
          <div className="mb-8 relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <Image
              src="/daw-logo.png"
              alt="Dominate And Win"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wider text-balance">
            Dominate And Win
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed text-pretty">
            DAW (Dominate And Win) is a community of FiveM players focused on dominance, teamwork, and competitive gameplay.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center">
            <Link
              href="/archive"
              className="px-8 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              View Archive
            </Link>
          </div>
        </div>

        {/* YouTube Button - Bottom Left */}
        <a
          href="https://www.youtube.com/@denvr2fast"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 left-4 z-40 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white"
            fill="currentColor"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>

        {/* Footer */}
        <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/40">
          Developed by Denver
        </footer>
      </main>

      <MusicPlayer videoUrl="https://www.youtube.com/watch?v=l5r8xViCg_M" />
    </div>
  )
}
