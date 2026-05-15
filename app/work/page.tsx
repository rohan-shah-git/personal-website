import { client } from '@/sanity/lib/client'
import { workQuery, siteConfigQuery } from '@/sanity/lib/queries'
import WorkClient from '../components/WorkClient'

export default async function WorkPage() {
  const [entries, siteConfig] = await Promise.all([
    client.fetch(workQuery),
    client.fetch(siteConfigQuery),
  ])
  return <WorkClient name={siteConfig?.name ?? ''} entries={entries ?? []} />
}
