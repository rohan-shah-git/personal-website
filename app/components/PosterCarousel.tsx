import { DM_Mono, DM_Sans, Bebas_Neue, Barlow_Condensed, Lora, Oswald } from 'next/font/google'
import Image from 'next/image'
import FitText from './FitText'

const dmMono = DM_Mono({ weight: '500', subsets: ['latin'] })
const dmSans = DM_Sans({ weight: ['400', '700'], subsets: ['latin'] })
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })
const barlowCondensed = Barlow_Condensed({ weight: ['300', '400'], subsets: ['latin'] })
const oswald = Oswald({ weight: ['300', '400'], subsets: ['latin'] })
const lora = Lora({ weight: '500', subsets: ['latin'] })

export interface WorkEntry {
  _id: string
  title: string
  role: string
  jobType?: string
  companyDescription?: string
  dateRange: string
  description: unknown[]
  descriptionText?: string
  posterDescription?: string
  posterImageUrl?: string
}

interface PosterCarouselProps {
  filmMode: boolean
  entries: WorkEntry[]
}

const BG_PALETTE = ['#1a1a2e', '#0a0a0a', '#111111', '#0f1a2a', '#1a100a', '#0a1a1a']

function deriveChip(role: string): string {
  const lower = role.toLowerCase()
  if (lower.includes('intern')) return 'INTERN'
  if (lower.includes('found')) return 'FOUNDING'
  if (lower.includes('contract')) return 'CONTRACT'
  if (lower.includes('partner')) return 'BIZ'
  if (lower.includes('engineer') || lower.includes('swe')) return 'SWE'
  if (lower.includes('product') || lower.includes(' pm')) return 'PM'
  if (lower.includes('data')) return 'DATA'
  if (lower.includes('design')) return 'DESIGN'
  return 'WORK'
}

const POSTER = 'bg-[#f5f3ee] px-5 pt-5 pb-4 border-[0.5px] border-[#c8c6be] flex flex-col min-h-[500px] sm:h-[429px] sm:min-h-0'

function Still({ bg, children }: { bg: string; children?: React.ReactNode }) {
  return (
    <div
      className="w-full aspect-square shrink-0 flex items-center justify-center mb-3 relative overflow-hidden"
      style={{ background: bg }}
    >
      {children}
    </div>
  )
}

function StillLogo({ text }: { text: string }) {
  const small = text.length > 6
  return (
    <span className={`${lora.className} text-white/90 text-center leading-none px-4 ${small ? 'text-[38px]' : 'text-[48px]'}`}>
      {text}
    </span>
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

export default function PosterCarousel({ filmMode, entries }: PosterCarouselProps) {
  if (!filmMode) return null

  return (
    <div className="relative pb-4">
      <p className={`${dmMono.className} hidden sm:flex text-[10px] text-[#888880] tracking-[0.08em] justify-center mb-2`}>
        ← scroll →
      </p>
      <div className={`${dmSans.className} grid [grid-template-columns:1fr] gap-4 sm:[grid-template-columns:none] sm:[grid-template-rows:repeat(2,429px)] sm:[grid-auto-flow:column] sm:[grid-auto-columns:300px] sm:gap-6 overflow-x-auto py-2 pb-6 [scrollbar-width:thin] [scrollbar-color:#b0aea6_transparent]`}>
        {entries.map((entry, i) => {
          const bg = BG_PALETTE[i % BG_PALETTE.length]
          return (
            <div key={entry._id} className={POSTER}>
              <Still bg={bg}>
                {entry.posterImageUrl ? (
                  <Image src={entry.posterImageUrl} alt={entry.title} fill className="object-cover" />
                ) : (
                  <StillLogo text={entry.title} />
                )}
              </Still>
              <Directed>{entry.role}</Directed>
              <Synopsis>{entry.posterDescription ?? entry.descriptionText ?? ''}</Synopsis>
              <Footer
                chip={entry.jobType ? entry.jobType.toUpperCase() : deriveChip(entry.role)}
                date={entry.dateRange}
                label={entry.title.toUpperCase()}
              />
            </div>
          )
        })}
      </div>

    </div>
  )
}
