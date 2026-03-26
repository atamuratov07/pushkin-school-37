import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: () => true,
		create: ({ req }) => Boolean(req.user),
		update: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			localized: true,
			required: true,
		},
	],
	upload: {
		mimeTypes: ['image/*'],
		imageSizes: [
			{
				name: 'thumbnail',
				width: 400,
				height: 300,
				position: 'center',
			},
		],
		adminThumbnail: 'thumbnail',
	},
}
