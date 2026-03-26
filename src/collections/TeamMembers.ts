import type { CollectionConfig } from 'payload'

const formatSlug = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

export const TeamMembers: CollectionConfig = {
	slug: 'team-members',
	admin: {
		useAsTitle: 'fullName',
		defaultColumns: ['fullName', 'roleType', 'position'],
	},
	access: {
		read: () => true,
		create: ({ req }) => Boolean(req.user),
		update: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
	},
	fields: [
		{
			name: 'fullName',
			type: 'text',
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
			},
			hooks: {
				beforeValidate: [
					({ value, data }) => {
						if (typeof value === 'string' && value.length > 0) {
							return formatSlug(value)
						}

						if (typeof data?.fullName === 'string') {
							return formatSlug(data.fullName)
						}

						return value
					},
				],
			},
		},
		{
			name: 'roleType',
			type: 'select',
			required: true,
			defaultValue: 'teacher',
			options: [
				{
					label: 'Teacher',
					value: 'teacher',
				},
				{
					label: 'Administration',
					value: 'administration',
				},
				{
					label: 'Staff',
					value: 'staff',
				},
			],
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'photo',
			type: 'upload',
			relationTo: 'media',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'position',
			type: 'text',
			localized: true,
			required: true,
		},
		{
			name: 'bio',
			type: 'textarea',
			localized: true,
		},
	],
}
