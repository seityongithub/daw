"use client"

import Link from "next/link"
import { useLanyard, getAvatarUrl, getDecorationUrl, getStatusColor } from "@/hooks/use-lanyard"
import type { Member } from "@/lib/members"

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  const { data, isLoading } = useLanyard(member.discordId)

  const status = data?.discord_status || "offline"
  const username = data?.discord_user?.global_name || data?.discord_user?.username || member.name
  const avatarUrl = data
    ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar)
    : `https://cdn.discordapp.com/embed/avatars/0.png`
  const decoration = data?.discord_user?.avatar_decoration_data?.asset

  const activity = data?.activities?.find((a) => a.type !== 4) || data?.spotify

  return (
    <Link href={`/${member.slug}`}>
      <div
        className="group relative bg-white/[0.08] backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:bg-white/[0.12] cursor-pointer h-[220px] flex flex-col"
      >
        {/* Avatar container */}
        <div className="relative w-24 h-24 mx-auto mb-4 flex-shrink-0">
          <div
            className="w-full h-full rounded-full overflow-hidden border-2 transition-colors duration-300"
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
            className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-black"
            style={{ backgroundColor: getStatusColor(status) }}
          />
        </div>

        {/* Username */}
        <h3 className="text-center text-lg font-bold text-white mb-1 group-hover:text-shadow-glow transition-all">
          {username}
        </h3>

        {/* Role */}
        <p className="text-center text-sm text-white/60">{member.role}</p>

        {/* Activity - Always reserve space, show content if available */}
        <div className="mt-auto pt-2">
          <div className="text-center text-xs text-white/40 truncate px-2 h-4">
            {activity && (
              data?.listening_to_spotify && data.spotify ? (
                <span>Listening to {data.spotify.song}</span>
              ) : (
                <span>Playing {"name" in activity ? activity.name : ""}</span>
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
