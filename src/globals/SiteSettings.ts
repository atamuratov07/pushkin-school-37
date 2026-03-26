import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
	slug: 'site-settings',
	access: {
		read: () => true,
		update: ({ req }) => Boolean(req.user),
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Branding',
					fields: [
						{
							name: 'schoolName',
							type: 'text',
							localized: true,
							required: true,
						},
						{
							name: 'schoolSubtitle',
							type: 'text',
							localized: true,
						},
						{
							name: 'logo',
							type: 'upload',
							relationTo: 'media',
							required: true,
						},
						{
							name: 'logoLight',
							type: 'upload',
							relationTo: 'media',
						},
					],
				},
				{
					label: 'Navigation',
					fields: [
						{
							name: 'headerNavigation',
							type: 'array',
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
								{
									name: 'openInNewTab',
									type: 'checkbox',
									defaultValue: false,
								},
							],
						},
						{
							name: 'footerNavigation',
							type: 'array',
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
								{
									name: 'openInNewTab',
									type: 'checkbox',
									defaultValue: false,
								},
							],
						},
					],
				},
				{
					label: 'Footer & Contact',
					fields: [
						{
							name: 'footerQuickLinksTitle',
							type: 'text',
							localized: true,
							required: true,
						},
						{
							name: 'footerSocialTitle',
							type: 'text',
							localized: true,
							required: true,
						},
						{
							name: 'footerAddressTitle',
							type: 'text',
							localized: true,
							required: true,
						},
						{
							name: 'address',
							type: 'textarea',
							localized: true,
							required: true,
						},
						{
							name: 'phone',
							type: 'text',
						},
						{
							name: 'email',
							type: 'text',
						},
						{
							name: 'socialLinks',
							type: 'array',
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
								{
									name: 'openInNewTab',
									type: 'checkbox',
									defaultValue: true,
								},
							],
						},
					],
				},
			],
		},
	],
}
