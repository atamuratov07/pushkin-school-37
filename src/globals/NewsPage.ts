import type { GlobalConfig } from 'payload'

export const NewsPage: GlobalConfig = {
	slug: 'news-page',
	access: {
		read: () => true,
		update: ({ req }) => Boolean(req.user),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			localized: true,
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			localized: true,
		},
	],
}
