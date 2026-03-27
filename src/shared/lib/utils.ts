import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { withLocale, type Locale } from '@/i18n/config'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function isExternalHref(href: string) {
	return (
		href.startsWith('http://') ||
		href.startsWith('https://') ||
		href.startsWith('mailto:') ||
		href.startsWith('tel:') ||
		href.startsWith('#')
	)
}

export function resolveHref(locale: Locale, href: string) {
	return isExternalHref(href) ? href : withLocale(locale, href)
}

export function formatLocalizedDate(date: string | Date, locale: Locale) {
	const parsedDate = date instanceof Date ? date : new Date(date)

	if (Number.isNaN(parsedDate.getTime())) {
		return typeof date === 'string' ? date : ''
	}

	return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(parsedDate)
}
