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
}

export interface Member {
  name: string
  slug: string
  discordId: string
  role: string
  background: string
  music: string
  socials?: SocialLinks
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
  },
  {
    name: "MAUREEN",
    slug: "maureen",
    discordId: "966398614840684606",
    role: "Founder",
    background: "/backgrounds/maureen.gif",
    music: "https://www.youtube.com/watch?v=8AsEhY-aBdo",
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
  },
]

export const getMemberBySlug = (slug: string): Member | undefined => {
  return members.find((m) => m.slug === slug.toLowerCase())
}

export const archiveVideos = [
  { id: "946wpd_8gho", title: "DAW Archive 1" },
  { id: "khA5jt5QO6A", title: "DAW Archive 2" },
  { id: "RSBb4h2XZQI", title: "DAW Archive 3" },
  { id: "sJjrNVtfBsg", title: "DAW Archive 4" },
  { id: "peAiTTkMqZ4", title: "DAW Archive 5" },
  { id: "nVVhiPaaHts", title: "DAW Archive 6" },
  { id: "W2Rm8POR2v8", title: "DAW Archive 7" },
  { id: "GQi8KuM1HVQ", title: "DAW Archive 8" },
  { id: "sRgUCWNHpSA", title: "DAW Archive 9" },
  { id: "ivzvxTPHPQc", title: "DAW Archive 10" },
  { id: "NUdDDqFiXV0", title: "DAW Archive 11" },
]