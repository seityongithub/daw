"use client"

import { Navbar } from "@/components/navbar"
import { MusicPlayer } from "@/components/music-player"
import { SnowEffect } from "@/components/snow-effect"
import { MemberCard } from "@/components/member-card"
import { members } from "@/lib/members"

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SnowEffect />
      <Navbar />

      <main className="relative pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider">
              The Crew
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              Meet the founders of Dominate And Win
            </p>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
              <MemberCard key={member.discordId} member={member} />
            ))}
          </div>
        </div>
      </main>

      <MusicPlayer videoUrl="https://www.youtube.com/watch?v=l5r8xViCg_M" />
    </div>
  )
}
