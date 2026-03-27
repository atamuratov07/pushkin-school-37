import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

const preserveOriginalSubmissionFields: CollectionBeforeChangeHook = ({
	data,
	operation,
	originalDoc,
}) => {
	if (operation !== 'update' || !originalDoc) {
		return data
	}

	return {
		...data,
		message: originalDoc.message,
		name: originalDoc.name,
		phone: originalDoc.phone,
	}
}

export const ContactSubmissions: CollectionConfig = {
	slug: 'contact-submissions',
	admin: {
		description: 'Incoming messages from the public contact form.',
		listSearchableFields: ['name', 'phone', 'message'],
		useAsTitle: 'name',
		defaultColumns: ['createdAt', 'name', 'phone', 'status', 'message'],
	},
	defaultSort: '-createdAt',
	access: {
		create: () => false,
		read: ({ req }) => Boolean(req.user),
		update: ({ req }) => Boolean(req.user),
		delete: ({ req }) => false,
	},
	labels: {
		singular: 'Message',
		plural: 'Messages',
	},
	hooks: {
		beforeChange: [preserveOriginalSubmissionFields],
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			label: 'Full name',
			access: {
				update: () => false,
			},
			admin: {
				readOnly: true,
			},
		},
		{
			name: 'phone',
			type: 'text',
			required: true,
			label: 'Phone number',
			access: {
				update: () => false,
			},
			admin: {
				readOnly: true,
			},
		},
		{
			name: 'message',
			type: 'textarea',
			required: true,
			access: {
				update: () => false,
			},
			admin: {
				readOnly: true,
			},
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
			label: 'Internal notes',
			admin: {
				position: 'sidebar',
			},
		},
	],
}
