'use client'

import { DM_Mono } from 'next/font/google'

const dmMono = DM_Mono({ weight: '500', subsets: ['latin'] })

export type Page = 'home' | 'work' | 'orgs'

const links: { label: string; page: Page }[] = [
  { label: 'home', page: 'home' },
  { label: 'work', page: 'work' },
  { label: 'orgs', page: 'orgs' },
]

interface NavProps {
  name: string
  activePage: Page
  onNavigate: (page: Page) => void
  filmMode?: boolean
  onToggleFilmMode?: () => void
}

export default function Nav({ name, activePage, onNavigate, filmMode, onToggleFilmMode }: NavProps) {
  return (
    <nav className={`${dmMono.className} flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between`}>
      <button
        onClick={() => onNavigate('home')}
        className="text-[30px] font-medium text-[#1c1c1a] tracking-[0.05em] shrink-0 text-left"
      >
        {name}
      </button>

      <div className="flex items-center gap-6">
        {links.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={[
              'relative py-1 text-xs font-medium text-[#1c1c1a] tracking-[0.05em] lowercase hover:text-black',
              activePage === page
                ? "after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1c1c1a] after:content-['']"
                : '',
            ].join(' ')}
          >
            {label}
          </button>
        ))}

        {onToggleFilmMode && (
          <button
            onClick={onToggleFilmMode}
            className={[
              'flex items-center gap-[6px] text-[10px] font-medium tracking-[0.12em] uppercase px-[0.6rem] py-[0.35rem] border-[0.5px] transition-all duration-200',
              filmMode
                ? 'bg-[#1c1c1a] text-[#f4f2ed] border-[#1c1c1a]'
                : 'text-[#6a6a62] border-[#d8d6d0] hover:text-[#1c1c1a] hover:border-[#1c1c1a]',
            ].join(' ')}
          >
            <span
              className={`w-[5px] h-[5px] rounded-full transition-colors duration-200 ${filmMode ? 'bg-[#e24b4a]' : 'bg-[#c0beb6]'}`}
            />
            <span>film mode</span>
          </button>
        )}
      </div>
    </nav>
  )
}
