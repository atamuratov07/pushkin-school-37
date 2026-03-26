import type { Locale } from './config'
import { ru } from './dictionaries/ru'
import { en } from './dictionaries/en'

const dictionaries = { ru, en }

export function getDictionary(locale: Locale) {
	return dictionaries[locale]
}
