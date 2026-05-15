import { client } from '@/sanity/lib/client'
import { orgsQuery, siteConfigQuery } from '@/sanity/lib/queries'
import OrgsClient from '../components/OrgsClient'

export default async function OrgsPage() {
  const [entries, siteConfig] = await Promise.all([
    client.fetch(orgsQuery),
    client.fetch(siteConfigQuery),
  ])
  return <OrgsClient name={siteConfig?.name ?? ''} entries={entries ?? []} />
}
