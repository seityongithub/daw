"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getMemberBySlug } from "@/lib/members"
import { useLanyard, getAvatarUrl, getDecorationUrl, getStatusColor } from "@/hooks/use-lanyard"
import { MusicPlayer } from "@/components/music-player"
import { SnowEffect } from "@/components/snow-effect"
import { ClickToEnter } from "@/components/click-to-enter"
import { ArrowLeft } from "lucide-react"

// HOW TO CHANGE BACKGROUND:
// 1. Go to Giphy, Tenor, Reddit, or Pinterest
// 2. Right click on GIF → Copy image/video address
// 3. Update the background field in lib/members.ts for the member

interface ProfilePageProps {
  params: Promise<{ slug: string }>
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = use(params)
  const member = getMemberBySlug(slug)

  if (!member) {
    notFound()
  }

  return <MemberProfile member={member} />
}

function MemberProfile({ member }: { member: NonNullable<ReturnType<typeof getMemberBySlug>> }) {
  const { data, isLoading } = useLanyard(member.discordId)
  const [hasEntered, setHasEntered] = useState(false)

  const status = data?.discord_status || "offline"
  const username = data?.discord_user?.global_name || data?.discord_user?.username || member.name
  const avatarUrl = data
    ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar)
    : `https://cdn.discordapp.com/embed/avatars/0.png`
  const decoration = data?.discord_user?.avatar_decoration_data?.asset

  const activity = data?.activities?.find((a) => a.type !== 4) || data?.spotify

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {!hasEntered && <ClickToEnter onEnter={() => setHasEntered(true)} />}
      {/* Background */}
      {member.background && (
        <div className="absolute inset-0 z-0">
          {member.background.endsWith(".mp4") ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={member.background} type="video/mp4" />
            </video>
          ) : (
            <img
              src={member.background}
              alt="background"
              className="w-full h-full object-cover"
            />
          )}
          {/* Dark overlay for readability - reduced for better GIF visibility */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Default gradient background if no custom background */}
      {!member.background && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      )}

      <SnowEffect />

      {/* Back button */}
      <Link
        href="/members"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Link>

      {/* Main content */}
      <main className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-20 gap-4">
        {/* Profile Card */}
        <div
          className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 w-full max-w-md text-center"
        >
          {/* Avatar */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
            <div
              className="w-full h-full rounded-full overflow-hidden border-4 transition-colors duration-300"
              style={{ borderColor: getStatusColor(status) }}
            >
              {isLoading ? (
                <div className="w-full h-full bg-white/10 animate-pulse" />
              ) : (
                <img
                  src={avatarUrl}
                  alt={username}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Avatar decoration */}
            {decoration && (
              <img
                src={getDecorationUrl(decoration)}
                alt="decoration"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: "scale(1.2)" }}
              />
            )}

            {/* Status indicator */}
            <div
              className="absolute bottom-2 right-2 w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-black/50"
              style={{ backgroundColor: getStatusColor(status) }}
            />
          </div>

          {/* Username with neon glow */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-2 tracking-wide"
            style={{
              textShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)",
            }}
          >
            {username}
          </h1>

          {/* Role */}
          <p className="text-white/60 text-lg mb-4">{member.role}</p>

          {/* Profile Views - Bottom Right Corner */}
          {member.views !== undefined && (
            <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-white/30 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{member.views.toLocaleString()}</span>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getStatusColor(status) }}
            />
            <span className="text-white/80 capitalize">{status}</span>
          </div>

          {/* Social Links */}
          {member.socials && (member.socials.youtube || member.socials.tiktok || member.socials.kick) && (
            <div className="flex items-center justify-center gap-3">
              {member.socials.youtube && (
                <a
                  href={member.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {member.socials.tiktok && (
                <a
                  href={member.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              )}
              {member.socials.discord && (
                <a
                  href={member.socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.04.106c.36.698.77 1.363 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .031-.055c.5-5.177-.838-9.674-3.548-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </a>
              )}
              {member.socials.kick && (
                <a
                  href={member.socials.kick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <path d="M1.333 0v24h6.209v-7.418l1.78 2.133 3.958 5.285h7.418l-7.418-9.924 7.006-9.076H13.28l-5.739 7.631V0z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Live Activity Section - Separate Box Below */}
        {(data?.listening_to_spotify || (activity && activity.name !== "Spotify")) && (
          <div className="w-full max-w-md space-y-3">
            {/* Spotify Activity */}
            {data?.listening_to_spotify && data.spotify && (
              <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={data.spotify.album_art_url}
                      alt={data.spotify.album}
                      className="w-14 h-14 rounded"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-green-400 font-medium">LISTENING TO SPOTIFY</span>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <p className="text-sm text-white font-medium truncate">{data.spotify.song}</p>
                    <p className="text-xs text-white/60 truncate">by {data.spotify.artist}</p>
                    <p className="text-xs text-white/40 truncate">on {data.spotify.album}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Game/App Activity - Only show if NOT Spotify */}
            {activity && activity.name !== "Spotify" && !data?.listening_to_spotify && (
              <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  {"assets" in activity && activity.assets?.large_image ? (
                    <img
                      src={activity.assets.large_image.startsWith("mp:") 
                        ? `https://media.discordapp.net/${activity.assets.large_image.replace("mp:", "")}`
                        : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                      }
                      alt={activity.name}
                      className="w-14 h-14 rounded flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-blue-400 font-medium">PLAYING A GAME</span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    </div>
                    <p className="text-sm text-white font-medium truncate">{activity.name}</p>
                    {"details" in activity && activity.details && (
                      <p className="text-xs text-white/60 truncate">{activity.details}</p>
                    )}
                    {"state" in activity && activity.state && (
                      <p className="text-xs text-white/40 truncate">{activity.state}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Show game activity alongside Spotify if playing a game AND listening */}
            {data?.listening_to_spotify && activity && activity.name !== "Spotify" && (
              <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  {"assets" in activity && activity.assets?.large_image ? (
                    <img
                      src={activity.assets.large_image.startsWith("mp:") 
                        ? `https://media.discordapp.net/${activity.assets.large_image.replace("mp:", "")}`
                        : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                      }
                      alt={activity.name}
                      className="w-14 h-14 rounded flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  <div className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-blue-400 font-medium">ALSO PLAYING</span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    </div>
                    <p className="text-sm text-white font-medium truncate">{activity.name}</p>
                    {"details" in activity && activity.details && (
                      <p className="text-xs text-white/60 truncate">{activity.details}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 left-0 right-0 text-center text-sm text-white/40 z-20">
        Developed by Denver
      </footer>

      <MusicPlayer videoUrl={member.music} />
    </div>
  )
}
