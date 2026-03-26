import type { CollectionConfig } from 'payload'

const formatSlug = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

export const News: CollectionConfig = {
	slug: 'news',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'publishedAt', 'isFeatured', 'updatedAt'],
	},
	access: {
		read: () => true,
		create: ({ req }) => Boolean(req.user),
		update: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
	},
	defaultSort: '-publishedAt',
	fields: [
		{
			name: 'title',
			type: 'text',
			localized: true,
			required: true,
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			index: true,
			admin: {
				position: 'sidebar',
				description: 'Shared across locales for stable URLs.',
			},
			hooks: {
				beforeValidate: [
					({ value, data }) => {
						if (typeof value === 'string' && value.length > 0) {
							return formatSlug(value)
						}

						if (typeof data?.title === 'string') {
							return formatSlug(data.title)
						}

						return value
					},
				],
			},
		},
		{
			name: 'featuredImage',
			type: 'upload',
			relationTo: 'media',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'publishedAt',
			type: 'date',
			required: true,
			admin: {
				position: 'sidebar',
				date: {
					pickerAppearance: 'dayAndTime',
				},
			},
		},
		{
			name: 'description',
			type: 'textarea',
			localized: true,
			required: true,
		},
		{
			name: 'isFeatured',
			type: 'checkbox',
			defaultValue: false,
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'content',
			type: 'textarea',
			localized: true,
			required: true,
		},
	],
}
