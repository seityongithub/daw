"use client"

import useSWR from "swr"

export interface LanyardActivity {
  name: string
  type: number
  application_id?: string
  state?: string
  details?: string
  timestamps?: {
    start?: number
    end?: number
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
}

export interface LanyardSpotify {
  track_id: string
  timestamps: {
    start: number
    end: number
  }
  album: string
  album_art_url: string
  artist: string
  song: string
}

export interface LanyardData {
  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    global_name?: string
    avatar_decoration_data?: {
      asset: string
      sku_id: string
    }
  }
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: LanyardActivity[]
  spotify?: LanyardSpotify
  listening_to_spotify: boolean
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  active_on_discord_web: boolean
}

interface LanyardResponse {
  success: boolean
  data: LanyardData
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useLanyard(discordId: string) {
  const { data, error, isLoading } = useSWR<LanyardResponse>(
    `https://api.lanyard.rest/v1/users/${discordId}`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  )

  return {
    data: data?.data,
    isLoading,
    isError: error || !data?.success,
  }
}

export function getAvatarUrl(userId: string, avatarHash: string | null): string {
  if (!avatarHash) {
    return `https://cdn.discordapp.com/embed/avatars/${parseInt(userId) % 5}.png`
  }
  const format = avatarHash.startsWith("a_") ? "gif" : "png"
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${format}?size=256`
}

export function getDecorationUrl(asset: string): string {
  return `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png`
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "online":
      return "#22c55e"
    case "idle":
      return "#eab308"
    case "dnd":
      return "#ef4444"
    default:
      return "#6b7280"
  }
}

export function getStatusGlow(status: string): string {
  switch (status) {
    case "online":
      return "0 0 20px rgba(34, 197, 94, 0.5)"
    case "idle":
      return "0 0 20px rgba(234, 179, 8, 0.5)"
    case "dnd":
      return "0 0 20px rgba(239, 68, 68, 0.5)"
    default:
      return "0 0 20px rgba(107, 114, 128, 0.3)"
  }
}
