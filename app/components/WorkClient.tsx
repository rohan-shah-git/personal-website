'use client'

import { useRouter } from 'next/navigation'
import Nav, { type Page } from './Nav'
import EntryList, { type Entry } from './EntryList'
import PosterCarousel, { type WorkEntry } from './PosterCarousel'
import { useFilmMode } from '../context/FilmModeContext'

interface WorkClientProps {
  name: string
  entries: WorkEntry[]
}

export default function WorkClient({ name, entries }: WorkClientProps) {
  const { filmMode, toggleFilmMode } = useFilmMode()
  const router = useRouter()

  function handleNavigate(page: Page) {
    const routes: Record<Page, string> = { home: '/', work: '/work', orgs: '/orgs' }
    router.push(routes[page])
  }

  const listEntries: Entry[] = entries.map(e => ({
    dateRange: e.dateRange,
    title: e.title,
    companyDescription: e.companyDescription,
    subtitle: e.role,
    description: e.description ?? [],
  }))

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[760px] mx-auto px-4 pt-6 pb-8 sm:px-10 sm:pt-10 sm:pb-12">
        <Nav
          name={name}
          activePage="work"
          onNavigate={handleNavigate}
          filmMode={filmMode}
          onToggleFilmMode={toggleFilmMode}
        />
        {filmMode
          ? <PosterCarousel filmMode={filmMode} entries={entries} />
          : <EntryList label="experience" entries={listEntries} />
        }
      </div>
    </main>
  )
}
