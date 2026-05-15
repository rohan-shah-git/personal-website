import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'organization',
  title: 'Organization',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Organization Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'companyDescription',
      title: 'Org Description',
      type: 'string',
      description: 'Short descriptor shown beside the org name (e.g. "student-run AI club").',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. AI + ART, PRODUCT, DATA, FILM',
    }),
    defineField({
      name: 'dateRange',
      title: 'Date Range',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block', styles: [], lists: [], marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }] } }],
    }),
    defineField({
      name: 'posterDescription',
      title: 'Film Mode Poster Description',
      type: 'text',
      description: 'Short description shown on the film mode poster card.',
    }),
    defineField({
      name: 'posterImage',
      title: 'Film Mode Poster Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
