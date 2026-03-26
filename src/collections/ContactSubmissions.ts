import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
	slug: 'contact-submissions',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'phone', 'status', 'createdAt'],
	},
	access: {
		create: () => true,
		read: ({ req }) => Boolean(req.user),
		update: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'phone',
			type: 'text',
			required: true,
		},
		{
			name: 'message',
			type: 'textarea',
			required: true,
		},
		{
			name: 'status',
			type: 'select',
			required: true,
			defaultValue: 'new',
			options: [
				{
					label: 'New',
					value: 'new',
				},
				{
					label: 'In Progress',
					value: 'in-progress',
				},
				{
					label: 'Resolved',
					value: 'resolved',
				},
				{
					label: 'Spam',
					value: 'spam',
				},
			],
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'notes',
			type: 'textarea',
		},
	],
}
