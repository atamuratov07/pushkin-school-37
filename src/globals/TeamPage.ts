import type { GlobalConfig } from 'payload'

export const TeamPage: GlobalConfig = {
	slug: 'team-page',
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
