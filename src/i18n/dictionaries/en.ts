export const en = {
	header: {
		home: 'Home',
		about: 'About',
	},
	events: {
		detailsButton: 'Learn more',
	},
	form: {
		fieldLabels: {
			message: 'Your message',
			name: 'Full name',
			phone: 'Phone number',
		},
		fieldPlaceholders: {
			message: 'Tell us how we can help',
			name: 'John Smith',
			phone: '+1 (555) 123-4567',
		},
		honeypotLabel: 'Leave this field empty',
		rateLimited: 'Too many attempts. Please try again later.',
		submitError: 'Failed to send the form. Please try again.',
		submitSuccess: 'Thanks. We will contact you soon.',
		validation: {
			messageMin: 'Message must be at least 10 characters',
			nameMin: 'Name must be at least 2 characters',
			phoneInvalid: 'Invalid phone number format',
			phoneMin: 'Phone number must be at least 10 digits',
			phoneRequired: 'Phone number is required',
		},
	},
} as const
