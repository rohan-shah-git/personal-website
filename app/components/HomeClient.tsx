'use client'

import { useRouter } from 'next/navigation'
import Nav, { type Page } from './Nav'
import Bio from './Bio'
import CurrentlyGrid from './CurrentlyGrid'
import Socials from './Socials'
import { useFilmMode } from '../context/FilmModeContext'
import type { PortableTextBlock } from 'sanity'

export interface CurrentlyItem {
  category: string
  value: string
  url?: string
}

interface SiteConfig {
  name: string
  email: string
  linkedin: string
  github: string
}

interface HomeClientProps {
  bio: { normalBio: PortableTextBlock[]; scriptBio: PortableTextBlock[] }
  currently: CurrentlyItem[]
  siteConfig: SiteConfig
}

export default function HomeClient({ bio, currently, siteConfig }: HomeClientProps) {
  const { filmMode, toggleFilmMode } = useFilmMode()
  const router = useRouter()

  function handleNavigate(page: Page) {
    const routes: Record<Page, string> = { home: '/', work: '/work', orgs: '/orgs' }
    router.push(routes[page])
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[760px] mx-auto px-4 pt-6 pb-8 sm:px-10 sm:pt-10 sm:pb-12">
        <Nav
          name={siteConfig.name}
          activePage="home"
          onNavigate={handleNavigate}
          filmMode={filmMode}
          onToggleFilmMode={toggleFilmMode}
        />
        <Bio filmMode={filmMode} normalBio={bio.normalBio} scriptBio={bio.scriptBio} />
        <CurrentlyGrid filmMode={filmMode} items={currently} />
        <Socials
          email={siteConfig.email}
          linkedin={siteConfig.linkedin}
          github={siteConfig.github}
        />
      </div>
    </main>
  )
}
