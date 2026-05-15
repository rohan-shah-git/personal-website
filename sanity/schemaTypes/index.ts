import { type SchemaTypeDefinition } from 'sanity'

import bio from './bio'
import currently from './currently'
import work from './work'
import organization from './organization'
import siteConfig from './siteConfig'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bio, currently, work, organization, siteConfig],
}
