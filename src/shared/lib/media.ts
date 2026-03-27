import type { Media } from '@/payload-types'

export type MediaRelation = number | Media | null | undefined

export function isMediaDoc(value: MediaRelation): value is Media {
	return !!value && typeof value === 'object' && 'id' in value
}

export function getMediaDoc(value: MediaRelation): Media | null {
	return isMediaDoc(value) ? value : null
}

export function getMediaUrl(
	value: MediaRelation,
	size?: keyof NonNullable<Media['sizes']>,
): string | null {
	const media = getMediaDoc(value)

	if (!media) {
		return null
	}

	if (size) {
		return media.sizes?.[size]?.url ?? media.url ?? null
	}

	return media.url ?? null
}

export function getMediaAlt(value: MediaRelation, fallback = ''): string {
	const media = getMediaDoc(value)

	if (!media?.alt) {
		return fallback
	}

	return media.alt
}
