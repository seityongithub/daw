// HOW TO GET GIF/MP4 BACKGROUNDS:
// 1. Go to:
// - Giphy
// - Tenor
// - Reddit
// - Pinterest
// 2. Right click → Copy image/video address
// 3. Paste here in the background field

export interface SocialLinks {
  youtube?: string
  tiktok?: string
  kick?: string
  discord?: string
}

export interface Member {
  name: string
  slug: string
  discordId: string
  role: string
  background: string
  music: string
  socials?: SocialLinks
  views?: number
}

export const members: Member[] = [
  {
    name: "DENVER",
    slug: "denver",
    discordId: "685390457852788784",
    role: "Founder",
    background: "/backgrounds/denver.gif",
    music: "https://www.youtube.com/watch?v=fG4g-HHRFPo",
    socials: {
      youtube: "https://www.youtube.com/@denvr2fast",
    },
    views: 2950,
  },
  {
    name: "CLYDEN",
    slug: "clyden",
    discordId: "441199824302374913",
    role: "Founder",
    background: "/backgrounds/clyden.gif",
    music: "https://www.youtube.com/watch?v=adfUwRb-GNc",
    socials: {
      youtube: "https://www.youtube.com/@ClydenFiveM",
    },
    views: 980,
  },
  {
    name: "BERTWO",
    slug: "bertwo",
    discordId: "1086911281707094107",
    role: "Founder",
    background: "/backgrounds/bertwo.gif",
    music: "https://www.youtube.com/watch?v=RxM60tvOXz0",
    socials: {
      youtube: "https://www.youtube.com/@bertwoalvarez",
    },
    views: 875,
  },
  {
    name: "RAMIE",
    slug: "ramie",
    discordId: "1247385547618390047",
    role: "Founder",
    background: "/backgrounds/ramie.gif",
    music: "https://www.youtube.com/watch?v=_-YjO6KfEMk",
    socials: {
      youtube: "https://www.youtube.com/@ramie-r4n",
    },
    views: 1720,
  },
  {
    name: "CHANCE",
    slug: "chance",
    discordId: "279638342021283840",
    role: "Founder",
    background: "/backgrounds/chance.gif",
    music: "https://youtu.be/zXgyDKGbscE",
    socials: {
      youtube: "https://www.youtube.com/@NoChance_GG",
      tiktok: "https://www.tiktok.com/@nochance_gg/",
    },
    views: 1100,
  },
  {
    name: "KING",
    slug: "king",
    discordId: "483259960755617816",
    role: "Founder",
    background: "/backgrounds/king.gif",
    music: "https://www.youtube.com/watch?v=VvsFYLqjbK4",
    socials: {
      youtube: "https://www.youtube.com/@kingghayes",
    },
    views: 1650,
  },
  {
    name: "MAUREEN",
    slug: "maureen",
    discordId: "966398614840684606",
    role: "Founder",
    background: "/backgrounds/maureen1.gif",
    music: "https://www.youtube.com/watch?v=OiwtQDRpl7U",
    socials: {
      youtube: "https://www.youtube.com/channel/UCYro4E7LxF002IxUgAj6Deg",
      discord: "https://discord.com/users/966398614840684606",
    },
    views: 1540,
  },
  {
    name: "SHANTY",
    slug: "shanty",
    discordId: "716585772861620285",
    role: "Founder",
    background: "/backgrounds/shanty.gif",
    music: "https://www.youtube.com/watch?v=lcs4vkkd3yY",
    socials: {
      youtube: "https://www.youtube.com/@Shanty_Yi",
      kick: "https://kick.com/tutishanty",
    },
    views: 430,
  },
  {
    name: "JUSTIN",
    slug: "justin",
    discordId: "655089283199402006",
    role: "Founder",
    background: "/backgrounds/justin.gif",
    music: "https://www.youtube.com/watch?v=iEo8thKLxFw",
    socials: {
      youtube: "https://www.youtube.com/@JxtnTempest",
      tiktok: "https://www.tiktok.com/@oblvcks",
    },
    views: 380,
  },
  {
    name: "RIRI",
    slug: "riri",
    discordId: "1222078946573553725",
    role: "Founder",
    background: "/backgrounds/riri.gif",
    music: "https://www.youtube.com/watch?v=MueOsq3_OVg",
    socials: {
      youtube: "https://www.youtube.com/@notwiwii",
      tiktok: "https://www.tiktok.com/@notririiii_",
    },
    views: 1231,
  },
  {
    name: "JAMBO",
    slug: "jambo",
    discordId: "1134152321417367765",
    role: "Founder",
    background: "/backgrounds/jambo.gif",
    music: "https://www.youtube.com/watch?v=4NMtC0L120A",
    socials: {
      youtube: "https://www.youtube.com/@Zipppp6_25",
    },
    views: 390,
  },
]

export const getMemberBySlug = (slug: string | undefined): Member | undefined => {
  if (!slug) return undefined
  return members.find((m) => m.slug === slug.toLowerCase())
}

// Archive video interface with optional custom thumbnail
// Supported formats: .avif, .png, .jpg, .jpeg, .webp, .gif
// Place thumbnails in /public/thumbnails/ folder
// Example: thumbnail: "/thumbnails/archive-1.avif"
export interface ArchiveVideo {
  id: string
  title: string
  thumbnail?: string // Optional custom thumbnail path (e.g., "/thumbnails/video1.png")
}

export const archiveVideos: ArchiveVideo[] = [
  { id: "946wpd_8gho", title: "DAW Archive 1", thumbnail: "" },
  { id: "khA5jt5QO6A", title: "DAW Archive 2", thumbnail: "/thumbnails/DAW2.avif" },
  { id: "RSBb4h2XZQI", title: "DAW Archive 3", thumbnail: "/thumbnails/DAW3.avif" },
  { id: "sJjrNVtfBsg", title: "DAW Archive 4", thumbnail: "" },
  { id: "peAiTTkMqZ4", title: "DAW Archive 5", thumbnail: "" },
  { id: "nVVhiPaaHts", title: "DAW Archive 6", thumbnail: "" },
  { id: "W2Rm8POR2v8", title: "DAW Archive 7", thumbnail: "/thumbnails/DAW7.avif" },
  { id: "GQi8KuM1HVQ", title: "DAW Archive 8", thumbnail: "" },
  { id: "sRgUCWNHpSA", title: "DAW Archive 9", thumbnail: "" },
  { id: "ivzvxTPHPQc", title: "DAW Archive 10", thumbnail: "/thumbnails/DAW10.avif" },
  { id: "NUdDDqFiXV0", title: "DAW Archive 11", thumbnail: "" },
  { id: "AgKVz8OE9lQ", title: "DAW Archive 12", thumbnail: "/thumbnails/DAW12.avif" },
  { id: "sV0BdH4MDNk", title: "DAW Archive 13", thumbnail: "/thumbnails/DAW13.avif" },
  { id: "CD9ScURUbg",  title: "DAW Archive 14", thumbnail: "/thumbnails/DAW14.avif" },
  { id: "SuwbxN9H9jo",  title: "DAW Archive 15", thumbnail: "/thumbnails/DAW15.avif" },
]
