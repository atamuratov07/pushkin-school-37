import type { GlobalConfig } from 'payload'

export const EventsPage: GlobalConfig = {
	slug: 'events-page',
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
