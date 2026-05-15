import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Company / Project',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'companyDescription',
      title: 'Company Description',
      type: 'string',
      description: 'Short descriptor shown beside the company name (e.g. "AI hardware startup").',
    }),
    defineField({
      name: 'dateRange',
      title: 'Date Range',
      type: 'string',
      description: 'e.g. 2024 — now',
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
      name: 'jobType',
      title: 'Job Type',
      type: 'string',
      description: 'Label shown in the boxed chip on the film mode poster (e.g. INTERN, SWE, PM).',
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
