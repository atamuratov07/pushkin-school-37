import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
	slug: 'homepage',
	access: {
		read: () => true,
		update: ({ req }) => Boolean(req.user),
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Hero',
					fields: [
						{
							name: 'hero',
							type: 'group',
							fields: [
								{
									name: 'title',
									type: 'textarea',
									localized: true,
									required: true,
								},
								{
									name: 'subtitle',
									type: 'text',
									localized: true,
									required: true,
								},
								{
									name: 'backgroundImage',
									type: 'upload',
									relationTo: 'media',
									required: true,
								},
								{
									name: 'primaryCTA',
									type: 'group',
									fields: [
										{
											name: 'label',
											type: 'text',
											localized: true,
											required: true,
										},
										{
											name: 'href',
											type: 'text',
											required: true,
										},
									],
								},
							],
						},
					],
				},
				{
					label: 'About Preview',
					fields: [
						{
							name: 'aboutPreview',
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
								{
									name: 'cta',
									type: 'group',
									fields: [
										{
											name: 'label',
											type: 'text',
											localized: true,
											required: true,
										},
										{
											name: 'href',
											type: 'text',
											required: true,
										},
									],
								},
							],
						},
					],
				},
				{
					label: 'Student Life Preview',
					fields: [
						{
							name: 'studentLifePreview',
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
								{
									name: 'cta',
									type: 'group',
									fields: [
										{
											name: 'label',
											type: 'text',
											localized: true,
											required: true,
										},
										{
											name: 'href',
											type: 'text',
											required: true,
										},
									],
								},
							],
						},
					],
				},
				{
					label: 'Latest News',
					fields: [
						{
							name: 'latestNews',
							type: 'group',
							fields: [
								{
									name: 'heading',
									type: 'text',
									localized: true,
									required: true,
								},
								{
									name: 'buttonLabel',
									type: 'text',
									localized: true,
									required: true,
								},
								{
									name: 'buttonHref',
									type: 'text',
									required: true,
								},
							],
						},
					],
				},
				{
					label: 'Instagram CTA',
					fields: [
						{
							name: 'instagramCTA',
							type: 'group',
							fields: [
								{
									name: 'beforeLinkText',
									type: 'textarea',
									localized: true,
									required: true,
								},
								{
									name: 'linkLabel',
									type: 'text',
									localized: true,
									required: true,
								},
								{
									name: 'linkURL',
									type: 'text',
									required: true,
								},
								{
									name: 'afterLinkText',
									type: 'text',
									localized: true,
								},
							],
						},
					],
				},
				{
					label: 'Contact Section',
					fields: [
						{
							name: 'contactSection',
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
									name: 'submitButtonLabel',
									type: 'text',
									localized: true,
									required: true,
								},
							],
						},
					],
				},
			],
		},
	],
}
