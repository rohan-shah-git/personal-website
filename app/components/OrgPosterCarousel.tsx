import { DM_Mono, DM_Sans, Bebas_Neue, Barlow_Condensed, Lora, Oswald } from 'next/font/google'
import Image from 'next/image'
import FitText from './FitText'

const dmMono = DM_Mono({ weight: '500', subsets: ['latin'] })
const dmSans = DM_Sans({ weight: ['400', '700'], subsets: ['latin'] })
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })
const barlowCondensed = Barlow_Condensed({ weight: ['300', '400'], subsets: ['latin'] })
const oswald = Oswald({ weight: ['300', '400'], subsets: ['latin'] })
const lora = Lora({ weight: '500', subsets: ['latin'] })

export interface OrgEntry {
  _id: string
  title: string
  role: string
  companyDescription?: string
  category: string
  dateRange: string
  description: unknown[]
  descriptionText?: string
  posterDescription?: string
  posterImageUrl?: string
}

interface OrgPosterCarouselProps {
  filmMode: boolean
  entries: OrgEntry[]
}

const POSTER = 'bg-[#f5f3ee] px-5 pt-5 pb-4 border-[0.5px] border-[#c8c6be] flex flex-col min-h-[500px] sm:h-[429px] sm:min-h-0'

const PURPLE = 'linear-gradient(135deg, #2a1530 0%, #4a2855 50%, #8050a0 100%)'
const GREEN  = 'linear-gradient(135deg, #0f2818 0%, #2d5a3e 50%, #70a088 100%)'

function logoSize(title: string): 'normal' | 'small' | 'tiny' {
  if (title.length > 20) return 'tiny'
  if (title.length > 10) return 'small'
  return 'normal'
}

function StillWithLogo({ bg, text }: { bg: string; text: string }) {
  const size = logoSize(text)
  const sz = size === 'tiny' ? 'text-[22px] leading-tight' : size === 'small' ? 'text-[36px] leading-none' : 'text-[48px] leading-none'
  return (
    <div
      className="w-full aspect-square shrink-0 flex items-center justify-center mb-3 overflow-hidden px-4"
      style={{ background: bg }}
    >
      <span className={`${lora.className} text-white/90 text-center ${sz}`}>{text}</span>
    </div>
  )
}

function Directed({ children }: { children: string }) {
  return (
    <div className={`${bebasNeue.className} text-[#1c1c1a] text-center mb-1 tracking-[0.08em] leading-none`}>
      <FitText maxSize={22} minSize={10}>{children}</FitText>
    </div>
  )
}

function Synopsis({ children }: { children: React.ReactNode }) {
  const text = typeof children === 'string' ? children.replace(/\n\s*\n/g, '\n') : children
  return (
    <p className={`${oswald.className} text-[12px] font-light text-[#1c1c1a] leading-[1.5] text-center mb-3 tracking-[0.06em] uppercase flex-1 overflow-hidden whitespace-pre-line [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]`}>
      {text}
    </p>
  )
}

function Footer({ chip, date, label }: { chip: string; date: string; label: string }) {
  return (
    <div className={`${dmMono.className} flex justify-between items-center pt-[10px] text-[9px] text-[#3c3c38] tracking-[0.04em]`}>
      <span className="border-[0.5px] border-[#1c1c1a] px-[6px] py-[2px] font-medium tracking-[0.08em]">{chip}</span>
      <span>{date}</span>
      <span>{label}</span>
    </div>
  )
}

export default function OrgPosterCarousel({ filmMode, entries }: OrgPosterCarouselProps) {
  if (!filmMode) return null

  return (
    <div className="relative pb-4">
      <p className={`${dmMono.className} hidden sm:flex text-[10px] text-[#888880] tracking-[0.08em] justify-center mb-2`}>
        ← scroll →
      </p>
      <div className={`${dmSans.className} grid [grid-template-columns:1fr] gap-4 sm:[grid-template-columns:none] sm:[grid-template-rows:repeat(2,429px)] sm:[grid-auto-flow:column] sm:[grid-auto-columns:300px] sm:gap-6 overflow-x-auto py-2 pb-6 [scrollbar-width:thin] [scrollbar-color:#b0aea6_transparent]`}>
        {entries.map((entry, i) => (
          <div key={entry._id} className={POSTER}>
            {entry.posterImageUrl ? (
              <div className="w-full aspect-square shrink-0 flex items-center justify-center mb-3 relative overflow-hidden" style={{ background: i % 2 === 0 ? PURPLE : GREEN }}>
                <Image src={entry.posterImageUrl} alt={entry.title} fill className="object-cover" />
              </div>
            ) : (
              <StillWithLogo bg={i % 2 === 0 ? PURPLE : GREEN} text={entry.title} />
            )}
            <Directed>{entry.role}</Directed>
            <Synopsis>{entry.posterDescription ?? entry.descriptionText ?? ''}</Synopsis>
            <Footer
              chip={entry.category?.toUpperCase() ?? ''}
              date={entry.dateRange}
              label="CLUB"
            />
          </div>
        ))}
      </div>

    </div>
  )
}
