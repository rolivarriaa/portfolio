import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'users',
  title: 'Users administration',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'userImage',
      title: 'User Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'userRole',
      title: 'User role',
      type: 'string',
      options: {
        list: [
          {title: 'Administrator', value: 'admin'},
          {title: 'Collaborator', value: 'collaborator'},
          {title: 'Tracking User', value: 'trackingUser'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      category: 'category',
    },
    prepare(selection) {
      const {title, media, category} = selection
      return {
        title: title,
        subtitle: category || 'Uncategorized',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Oldest',
      name: 'publishedAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})
