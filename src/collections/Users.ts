import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'username',
	},
	auth: {
		loginWithUsername: true,
	},
	fields: [
		// Email added by default
		// Add more fields as needed
	],
	timestamps: true,
}
