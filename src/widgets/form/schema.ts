import * as z from 'zod'

export type ContactFormValidationMessages = {
	messageMin: string
	nameMin: string
	phoneInvalid: string
	phoneMin: string
	phoneRequired: string
}

export function createContactFormSchema(
	messages: ContactFormValidationMessages,
) {
	return z.object({
		name: z.string().trim().min(2, messages.nameMin),
		phone: z
			.string()
			.trim()
			.min(1, messages.phoneRequired)
			.regex(/^[0-9+\-\s()]+$/, messages.phoneInvalid)
			.min(10, messages.phoneMin),
		message: z.string().trim().min(10, messages.messageMin),
	})
}

export type ContactFormValues = z.infer<
	ReturnType<typeof createContactFormSchema>
>
