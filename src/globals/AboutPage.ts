import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
	slug: 'about-page',
	access: {
		read: () => true,
		update: ({ req }) => Boolean(req.user),
	},
	fields: [
		{
			name: 'hero',
			type: 'group',
			fields: [
				{
					name: 'title',
					type: 'text',
					localized: true,
					required: true,
				},
				{
					name: 'subtitle',
					type: 'textarea',
					localized: true,
					required: true,
				},
			],
		},
		{
			name: 'directorSection',
			type: 'group',
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
					required: true,
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
			],
		},
		{
			name: 'valuesSection',
			type: 'group',
			fields: [
				{
					name: 'title',
					type: 'text',
					localized: true,
					required: true,
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'values',
					type: 'array',
					fields: [
						{
							name: 'label',
							type: 'text',
							localized: true,
							required: true,
						},
					],
				},
			],
		},
		{
			name: 'administrationSection',
			type: 'group',
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
					required: true,
				},
			],
		},
	],
}
