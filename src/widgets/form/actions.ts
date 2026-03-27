'use server'

import { headers } from 'next/headers'

import { getDictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { getPayloadClient } from '@/shared/lib/payload'

import {
	createContactFormSchema,
	type ContactFormValues,
} from './schema'

type ContactFormSubmissionInput = ContactFormValues & {
	locale: Locale
	website?: string
}

export type ContactFormActionResult = {
	fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>
	message: string
	status: 'error' | 'success'
}

type RateLimitEntry = {
	count: number
	expiresAt: number
}

type HeaderReader = {
	get(name: string): string | null
}

const RATE_LIMIT_MAX_REQUESTS = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

const globalRateLimitStore = globalThis as typeof globalThis & {
	__contactFormRateLimitStore?: Map<string, RateLimitEntry>
}

const rateLimitStore =
	globalRateLimitStore.__contactFormRateLimitStore ??
	(globalRateLimitStore.__contactFormRateLimitStore = new Map())

function getClientIdentifier(headerList: HeaderReader) {
	const forwardedFor = headerList.get('x-forwarded-for')
	const firstForwardedIp = forwardedFor?.split(',')[0]?.trim()

	return (
		firstForwardedIp ||
		headerList.get('x-real-ip') ||
		headerList.get('cf-connecting-ip') ||
		'unknown'
	)
}

function consumeRateLimit(identifier: string) {
	const now = Date.now()

	for (const [key, entry] of rateLimitStore.entries()) {
		if (entry.expiresAt <= now) {
			rateLimitStore.delete(key)
		}
	}

	const currentEntry = rateLimitStore.get(identifier)

	if (!currentEntry || currentEntry.expiresAt <= now) {
		rateLimitStore.set(identifier, {
			count: 1,
			expiresAt: now + RATE_LIMIT_WINDOW_MS,
		})

		return true
	}

	if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
		return false
	}

	currentEntry.count += 1
	return true
}

export async function submitContactFormAction(
	input: ContactFormSubmissionInput,
): Promise<ContactFormActionResult> {
	const dictionary = getDictionary(input.locale).form

	if (input.website?.trim()) {
		return {
			message: dictionary.submitSuccess,
			status: 'success',
		}
	}

	const schema = createContactFormSchema(dictionary.validation)
	const parsedInput = schema.safeParse({
		message: input.message,
		name: input.name,
		phone: input.phone,
	})

	if (!parsedInput.success) {
		return {
			fieldErrors: parsedInput.error.flatten().fieldErrors,
			message: dictionary.submitError,
			status: 'error',
		}
	}

	const headerStore = await headers()
	const clientIdentifier = getClientIdentifier(headerStore)

	if (!consumeRateLimit(clientIdentifier)) {
		return {
			message: dictionary.rateLimited,
			status: 'error',
		}
	}

	try {
		const payload = await getPayloadClient()

		await payload.create({
			collection: 'contact-submissions',
			data: {
				message: parsedInput.data.message,
				name: parsedInput.data.name,
				phone: parsedInput.data.phone,
				status: 'new',
			},
			draft: false,
			overrideAccess: true,
		})

		return {
			message: dictionary.submitSuccess,
			status: 'success',
		}
	} catch (error) {
		console.error('Failed to create contact submission.')
		console.error(error)

		return {
			message: dictionary.submitError,
			status: 'error',
		}
	}
}
