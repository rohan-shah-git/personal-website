import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bio',
  title: 'Bio',
  type: 'document',
  fields: [
    defineField({
      name: 'normalBio',
      title: 'Normal Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'scriptBio',
      title: 'Script / Film Mode Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
