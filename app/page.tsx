import { client } from '@/sanity/lib/client'
import { bioQuery, currentlyQuery, siteConfigQuery } from '@/sanity/lib/queries'
import HomeClient from './components/HomeClient'

export default async function Home() {
  const [bio, currently, siteConfig] = await Promise.all([
    client.fetch(bioQuery),
    client.fetch(currentlyQuery),
    client.fetch(siteConfigQuery),
  ])

  return (
    <HomeClient
      bio={bio ?? { normalBio: [], scriptBio: [] }}
      currently={currently ?? []}
      siteConfig={siteConfig ?? { name: '', email: '', linkedin: '', github: '' }}
    />
  )
}
