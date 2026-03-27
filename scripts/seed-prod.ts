import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from 'payload'
import config from '../src/payload-config.ts'
import type {
	AboutPage,
	Event,
	EventsPage,
	Homepage,
	Media,
	News,
	NewsPage,
	SiteSetting,
	TeamMember,
	TeamPage,
} from '../src/payload-types.ts'

const DEFAULT_LOCALE = 'ru' as const
const LOCALES = [DEFAULT_LOCALE, 'en'] as const
const RUN_TIMESTAMP = new Date().toISOString()

process.env.PAYLOAD_MIGRATING = 'true'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '..')
const publicDir = path.join(rootDir, 'public')

type SeedLocale = (typeof LOCALES)[number]
type LocalizedValue<T> = Record<SeedLocale, T>
type PayloadInstance = Awaited<ReturnType<typeof getPayload>>

type GlobalSlug =
	| 'site-settings'
	| 'homepage'
	| 'about-page'
	| 'news-page'
	| 'events-page'
	| 'team-page'

type CollectionSlug = 'news' | 'events' | 'team-members'

type GlobalSeedDataMap = {
	'site-settings': Omit<SiteSetting, 'id' | 'updatedAt' | 'createdAt'>
	homepage: Omit<Homepage, 'id' | 'updatedAt' | 'createdAt'>
	'about-page': Omit<AboutPage, 'id' | 'updatedAt' | 'createdAt'>
	'news-page': Omit<NewsPage, 'id' | 'updatedAt' | 'createdAt'>
	'events-page': Omit<EventsPage, 'id' | 'updatedAt' | 'createdAt'>
	'team-page': Omit<TeamPage, 'id' | 'updatedAt' | 'createdAt'>
}

type CollectionSeedDataMap = {
	news: Omit<News, 'id' | 'updatedAt' | 'createdAt'>
	events: Omit<Event, 'id' | 'updatedAt' | 'createdAt'>
	'team-members': Omit<TeamMember, 'id' | 'updatedAt' | 'createdAt'>
}

type MediaSeedData = Pick<Media, 'alt'>

type SeedMediaDefinition = {
	alt: LocalizedValue<string>
	sourcePath: string
	uploadFilename: string
}

type LinkSeed = {
	label: LocalizedValue<string>
	href: string
	openInNewTab: boolean
}

type NewsItemSeed = {
	slug: string
	title: LocalizedValue<string>
	description: LocalizedValue<string>
	content: LocalizedValue<string>
	publishedAt: string
	isFeatured: boolean
}

type EventItemSeed = {
	slug: string
	title: LocalizedValue<string>
	location: LocalizedValue<string>
	content: LocalizedValue<string>
	startDate: string
	isFeatured: boolean
}

type TeamMemberSeed = {
	fullName: string
	slug: string
	roleType: TeamMember['roleType']
	position: LocalizedValue<string>
	bio: LocalizedValue<string>
}

type ArrayRowWithOptionalId = {
	id?: string | null
}

export type SeedRunOptions = {
	assetBaseURL?: string
}

const mediaDefinitions = {
	logo: {
		alt: {
			ru: 'Логотип школы №37',
			en: 'School No. 37 logo',
		},
		sourcePath: 'icons/logo.svg',
		uploadFilename: 'site-logo.svg',
	},
	logoLight: {
		alt: {
			ru: 'Белый логотип школы №37',
			en: 'School No. 37 light logo',
		},
		sourcePath: 'icons/logo-white.svg',
		uploadFilename: 'site-logo-light.svg',
	},
	homeHeroBackground: {
		alt: {
			ru: 'Главный баннер школы №37',
			en: 'School No. 37 hero banner',
		},
		sourcePath: 'images/home/bg-image-1.png',
		uploadFilename: 'home-hero-background.png',
	},
	homeAboutImage: {
		alt: {
			ru: 'Фото школы №37',
			en: 'School No. 37 building',
		},
		sourcePath: 'images/home/image-2.png',
		uploadFilename: 'home-about-preview.png',
	},
	homeStudentLifeImage: {
		alt: {
			ru: 'Жизнь учеников школы №37',
			en: 'Student life at School No. 37',
		},
		sourcePath: 'images/home/image-1.png',
		uploadFilename: 'home-student-life.png',
	},
	newsCoverImage: {
		alt: {
			ru: 'Иллюстрация новостей школы №37',
			en: 'School No. 37 news illustration',
		},
		sourcePath: 'images/home/image-3.png',
		uploadFilename: 'news-cover-image.png',
	},
	aboutDirectorImage: {
		alt: {
			ru: 'Директор школы №37',
			en: 'School No. 37 principal',
		},
		sourcePath: 'images/about/image-1.png',
		uploadFilename: 'about-director-image.png',
	},
	aboutValuesImage: {
		alt: {
			ru: 'Принципы и ценности школы №37',
			en: 'School No. 37 values illustration',
		},
		sourcePath: 'images/about/image-2.png',
		uploadFilename: 'about-values-image.png',
	},
	teamProfileImage: {
		alt: {
			ru: 'Портрет сотрудника школы №37',
			en: 'School No. 37 staff portrait',
		},
		sourcePath: 'images/shared/profile.jpg',
		uploadFilename: 'team-member-profile.jpg',
	},
} satisfies Record<string, SeedMediaDefinition>

type MediaKey = keyof typeof mediaDefinitions
type MediaIds = Record<MediaKey, number>

const headerNavigation = [
	{ label: { ru: 'Главная', en: 'Home' }, href: '/', openInNewTab: false },
	{ label: { ru: 'О нас', en: 'About' }, href: '/about', openInNewTab: false },
	{ label: { ru: 'Новости', en: 'News' }, href: '/news', openInNewTab: false },
	{
		label: { ru: 'Учителя', en: 'Teachers' },
		href: '/teachers',
		openInNewTab: false,
	},
	{
		label: { ru: 'Ученики', en: 'Students' },
		href: '/students',
		openInNewTab: false,
	},
	{
		label: { ru: 'События', en: 'Events' },
		href: '/events',
		openInNewTab: false,
	},
	{
		label: { ru: 'Контакты', en: 'Contacts' },
		href: '/#contact-form',
		openInNewTab: false,
	},
] satisfies readonly LinkSeed[]

const footerNavigation = [
	{ label: { ru: 'О нас', en: 'About' }, href: '/about', openInNewTab: false },
	{ label: { ru: 'Новости', en: 'News' }, href: '/news', openInNewTab: false },
	{
		label: { ru: 'События', en: 'Events' },
		href: '/events',
		openInNewTab: false,
	},
	{
		label: { ru: 'Учителя', en: 'Teachers' },
		href: '/teachers',
		openInNewTab: false,
	},
	{
		label: { ru: 'Ученики', en: 'Students' },
		href: '/students',
		openInNewTab: false,
	},
	{
		label: { ru: 'Контакты', en: 'Contacts' },
		href: '/#contact-form',
		openInNewTab: false,
	},
] satisfies readonly LinkSeed[]

const socialLinks = [
	{
		label: { ru: 'Instagram', en: 'Instagram' },
		href: 'https://www.instagram.com/37shkola.nukus/',
		openInNewTab: true,
	},
] satisfies readonly LinkSeed[]

const newsItems = [
	{
		slug: 'school-events-discussion-2026-04-14',
		title: {
			ru: 'Обсуждение школьных мероприятий: присоединяйтесь к общению!',
			en: 'Discussion of school events: join the conversation!',
		},
		description: {
			ru: 'Школа №37 имени А.С. Пушкина приглашает учеников, родителей и выпускников к открытому обсуждению школьных инициатив, предстоящих мероприятий и совместных проектов.',
			en: 'School No. 37 named after A.S. Pushkin invites students, parents, and alumni to an open discussion of school initiatives, upcoming events, and shared projects.',
		},
		content: {
			ru: 'Школа №37 имени А.С. Пушкина приглашает учеников, родителей и выпускников к открытому обсуждению школьных инициатив, предстоящих мероприятий и совместных проектов. Нам важно услышать предложения, идеи и отзывы, чтобы создавать более насыщенную и полезную школьную среду.',
			en: 'School No. 37 named after A.S. Pushkin invites students, parents, and alumni to an open discussion of school initiatives, upcoming events, and shared projects. We want to hear suggestions, ideas, and feedback so we can build a richer and more supportive school environment.',
		},
		publishedAt: '2026-04-14',
		isFeatured: true,
	},
	{
		slug: 'school-events-discussion-2026-04-10',
		title: {
			ru: 'Обсуждение школьных мероприятий: присоединяйтесь к общению!',
			en: 'Discussion of school events: join the conversation!',
		},
		description: {
			ru: 'Школа №37 продолжает серию встреч, где обсуждаются учебные инициативы, школьные праздники и форматы совместной работы с родителями.',
			en: 'School No. 37 continues its series of meetings focused on academic initiatives, school celebrations, and formats for working more closely with parents.',
		},
		content: {
			ru: 'Школа №37 продолжает серию встреч, где обсуждаются учебные инициативы, школьные праздники и форматы совместной работы с родителями. Такой диалог помогает быстрее внедрять полезные изменения и поддерживать школьное сообщество в едином ритме.',
			en: 'School No. 37 continues its series of meetings focused on academic initiatives, school celebrations, and formats for working more closely with parents. This dialogue helps us introduce useful improvements faster and keep the school community aligned.',
		},
		publishedAt: '2026-04-10',
		isFeatured: true,
	},
	{
		slug: 'school-events-discussion-2026-04-03',
		title: {
			ru: 'Обсуждение школьных мероприятий: присоединяйтесь к общению!',
			en: 'Discussion of school events: join the conversation!',
		},
		description: {
			ru: 'Встреча посвящена планированию весенних мероприятий, поддержке ученических проектов и новым форматам взаимодействия внутри школы.',
			en: 'This meeting focuses on planning spring events, supporting student projects, and introducing new ways for the school community to collaborate.',
		},
		content: {
			ru: 'Встреча посвящена планированию весенних мероприятий, поддержке ученических проектов и новым форматам взаимодействия внутри школы. Мы стремимся сделать школьную жизнь более живой, открытой и интересной для каждого ученика.',
			en: 'This meeting focuses on planning spring events, supporting student projects, and introducing new ways for the school community to collaborate. We want school life to feel more active, open, and engaging for every student.',
		},
		publishedAt: '2026-04-03',
		isFeatured: true,
	},
	{
		slug: 'school-events-discussion-2026-03-28',
		title: {
			ru: 'Обсуждение школьных мероприятий: присоединяйтесь к общению!',
			en: 'Discussion of school events: join the conversation!',
		},
		description: {
			ru: 'Открытая дискуссия помогает собирать идеи учеников и родителей и превращать их в конкретные школьные инициативы.',
			en: 'The open discussion helps gather ideas from students and parents and turn them into concrete school initiatives.',
		},
		content: {
			ru: 'Открытая дискуссия помогает собирать идеи учеников и родителей и превращать их в конкретные школьные инициативы. Такие встречи становятся важной частью жизни школы и укрепляют связь между администрацией, учителями и семьями.',
			en: 'The open discussion helps gather ideas from students and parents and turn them into concrete school initiatives. Meetings like this strengthen the connection between the administration, teachers, and families.',
		},
		publishedAt: '2026-03-28',
		isFeatured: false,
	},
] satisfies readonly NewsItemSeed[]

const eventItems = [
	{
		slug: 'last-bell-2026-04-22',
		title: { ru: 'Последний звонок', en: 'Last Bell' },
		location: {
			ru: 'Школа №37 имени А.С. Пушкина',
			en: 'School No. 37 named after A.S. Pushkin',
		},
		content: {
			ru: 'Торжественное мероприятие, посвященное завершению учебного года. Ученики, учителя и родители соберутся вместе, чтобы отметить важный этап школьной жизни.',
			en: 'A ceremonial event dedicated to the end of the school year. Students, teachers, and parents will gather together to celebrate an important stage of school life.',
		},
		startDate: '2026-04-22',
		isFeatured: false,
	},
	{
		slug: 'last-bell-2026-04-18',
		title: { ru: 'Последний звонок', en: 'Last Bell' },
		location: {
			ru: 'Школа №37 имени А.С. Пушкина',
			en: 'School No. 37 named after A.S. Pushkin',
		},
		content: {
			ru: 'Подготовительная встреча для выпускников и учителей, на которой согласовываются выступления, программа и организационные детали школьного праздника.',
			en: 'A preparatory meeting for graduates and teachers to confirm performances, the program, and key organizational details for the school celebration.',
		},
		startDate: '2026-04-18',
		isFeatured: false,
	},
	{
		slug: 'last-bell-2026-04-12',
		title: { ru: 'Последний звонок', en: 'Last Bell' },
		location: {
			ru: 'Школа №37 имени А.С. Пушкина',
			en: 'School No. 37 named after A.S. Pushkin',
		},
		content: {
			ru: 'Репетиция праздничной программы с участием учеников и педагогов. Мы готовим теплую и запоминающуюся церемонию для всей школьной общины.',
			en: 'A rehearsal of the festive program with students and teachers taking part. We are preparing a warm and memorable ceremony for the entire school community.',
		},
		startDate: '2026-04-12',
		isFeatured: false,
	},
	{
		slug: 'last-bell-2026-04-05',
		title: { ru: 'Последний звонок', en: 'Last Bell' },
		location: {
			ru: 'Школа №37 имени А.С. Пушкина',
			en: 'School No. 37 named after A.S. Pushkin',
		},
		content: {
			ru: 'Старт подготовки к выпускному периоду: обсуждаем сценарий, оформление пространства и участие школьных коллективов.',
			en: 'We are beginning preparations for graduation season and aligning the program, venue setup, and participation of school teams.',
		},
		startDate: '2026-04-05',
		isFeatured: false,
	},
] satisfies readonly EventItemSeed[]

const administrationMembers: TeamMemberSeed[] = Array.from(
	{ length: 8 },
	(_, index) => ({
		fullName: 'Миртурды Досназаров',
		slug: `mirturdy-dosnazarov-administration-${index + 1}`,
		roleType: 'administration',
		position: {
			ru: 'Директор',
			en: 'Principal',
		},
		bio: {
			ru: 'Координирует стратегическое развитие школы, поддерживает учебные инициативы и создает условия для устойчивого роста школьного сообщества.',
			en: 'Coordinates the strategic development of the school, supports academic initiatives, and creates the conditions for steady growth across the school community.',
		},
	}),
)

const teacherMembers: TeamMemberSeed[] = Array.from(
	{ length: 8 },
	(_, index) => ({
		fullName: 'Миртурды Досназаров',
		slug: `mirturdy-dosnazarov-teacher-${index + 1}`,
		roleType: 'teacher',
		position: {
			ru: 'Учитель',
			en: 'Teacher',
		},
		bio: {
			ru: 'Внимательно работает с каждым учеником, помогает раскрывать сильные стороны детей и поддерживает интерес к обучению.',
			en: 'Works closely with each student, helps children develop their strengths, and supports lasting interest in learning.',
		},
	}),
)

const aboutValues = [
	{ ru: 'Доброта', en: 'Kindness' },
	{ ru: 'Уважение', en: 'Respect' },
	{ ru: 'Ответственность', en: 'Responsibility' },
	{ ru: 'Стремление', en: 'Aspiration' },
	{ ru: 'Радость', en: 'Joy' },
] satisfies readonly LocalizedValue<string>[]

function toSeedDate(date: string) {
	return `${date}T09:00:00.000Z`
}

function getLocalizedValue<T>(value: LocalizedValue<T>, locale: SeedLocale) {
	return value[locale]
}

function localizeLinks(items: readonly LinkSeed[], locale: SeedLocale) {
	return items.map(item => ({
		label: getLocalizedValue(item.label, locale),
		href: item.href,
		openInNewTab: item.openInNewTab,
	}))
}

function preserveArrayRowIds<TRow extends Record<string, unknown>>(
	rows: TRow[] | null | undefined,
	existingRows: ArrayRowWithOptionalId[] | null | undefined,
) {
	if (!rows) {
		return rows
	}

	return rows.map((row, index) => ({
		...row,
		id: existingRows?.[index]?.id ?? undefined,
	}))
}

async function assertFileExists(relativePath: string) {
	const absolutePath = path.join(publicDir, relativePath)
	await fs.access(absolutePath)
	return absolutePath
}

function buildAssetURL(assetBaseURL: string, sourceRelativePath: string) {
	const normalizedBaseURL = assetBaseURL.endsWith('/')
		? assetBaseURL
		: `${assetBaseURL}/`
	const normalizedRelativePath = sourceRelativePath.startsWith('/')
		? sourceRelativePath.slice(1)
		: sourceRelativePath

	return new URL(normalizedRelativePath, normalizedBaseURL)
}

async function createUploadSource(
	tempDir: string,
	sourceRelativePath: string,
	uploadFilename: string,
	assetBaseURL?: string,
) {
	const uploadPath = path.join(tempDir, uploadFilename)

	if (assetBaseURL) {
		const sourceURL = buildAssetURL(assetBaseURL, sourceRelativePath)
		const response = await fetch(sourceURL, {
			cache: 'no-store',
			redirect: 'follow',
		})

		if (!response.ok) {
			throw new Error(
				`Failed to fetch seed asset ${sourceURL.toString()}: ${response.status} ${response.statusText}`,
			)
		}

		const fileBuffer = Buffer.from(await response.arrayBuffer())
		await fs.writeFile(uploadPath, fileBuffer)

		return uploadPath
	}

	const sourcePath = await assertFileExists(sourceRelativePath)
	await fs.copyFile(sourcePath, uploadPath)

	return uploadPath
}

async function ensureMedia(
	payload: PayloadInstance,
	tempDir: string,
	definition: SeedMediaDefinition,
	assetBaseURL?: string,
) {
	const existing = await payload.find({
		collection: 'media',
		limit: 1,
		locale: DEFAULT_LOCALE,
		overrideAccess: true,
		where: {
			filename: {
				equals: definition.uploadFilename,
			},
		},
	})

	let mediaId: number | null = existing.docs[0]?.id ?? null

	if (!mediaId) {
		const uploadPath = await createUploadSource(
			tempDir,
			definition.sourcePath,
			definition.uploadFilename,
			assetBaseURL,
		)

		const created = await payload.create({
			collection: 'media',
			data: {
				alt: definition.alt[DEFAULT_LOCALE],
			} satisfies MediaSeedData,
			draft: false,
			filePath: uploadPath,
			locale: DEFAULT_LOCALE,
			overrideAccess: true,
		})

		mediaId = created.id
	}

	if (mediaId === null) {
		throw new Error(`Failed to seed media for ${definition.uploadFilename}`)
	}

	for (const locale of LOCALES) {
		if (locale === DEFAULT_LOCALE && !existing.docs[0]) {
			continue
		}

		await payload.update({
			collection: 'media',
			id: mediaId,
			data: {
				alt: definition.alt[locale],
			},
			locale,
			overrideAccess: true,
		})
	}

	return mediaId
}

function buildSiteSettings(
	locale: SeedLocale,
	mediaIds: MediaIds,
): GlobalSeedDataMap['site-settings'] {
	return {
		schoolName: getLocalizedValue(
			{ ru: 'Школа №37', en: 'School No. 37' },
			locale,
		),
		schoolSubtitle: getLocalizedValue(
			{ ru: 'имени А.С. Пушкина', en: 'named after A.S. Pushkin' },
			locale,
		),
		logo: mediaIds.logo,
		logoLight: mediaIds.logoLight,
		headerNavigation: localizeLinks(headerNavigation, locale),
		footerNavigation: localizeLinks(footerNavigation, locale),
		footerQuickLinksTitle: getLocalizedValue(
			{ ru: 'Быстрая навигация', en: 'Quick links' },
			locale,
		),
		footerSocialTitle: getLocalizedValue(
			{ ru: 'Будьте на связи', en: 'Stay connected' },
			locale,
		),
		footerAddressTitle: getLocalizedValue(
			{ ru: 'Наш адрес', en: 'Our address' },
			locale,
		),
		address: getLocalizedValue(
			{ ru: 'г. Нукус, ул. Пушкина, 37', en: '37 Pushkin Street, Nukus' },
			locale,
		),
		phone: null,
		email: null,
		socialLinks: localizeLinks(socialLinks, locale),
	}
}

function withPreservedSiteSettingsArrayRowIds(
	data: GlobalSeedDataMap['site-settings'],
	existing: Pick<
		SiteSetting,
		'headerNavigation' | 'footerNavigation' | 'socialLinks'
	>,
): GlobalSeedDataMap['site-settings'] {
	return {
		...data,
		headerNavigation: preserveArrayRowIds(
			data.headerNavigation,
			existing.headerNavigation,
		),
		footerNavigation: preserveArrayRowIds(
			data.footerNavigation,
			existing.footerNavigation,
		),
		socialLinks: preserveArrayRowIds(data.socialLinks, existing.socialLinks),
	}
}

function buildHomepage(
	locale: SeedLocale,
	mediaIds: MediaIds,
): GlobalSeedDataMap['homepage'] {
	return {
		hero: {
			title: getLocalizedValue(
				{
					ru: 'Школа — не только место, где учат, но и где учатся жить!',
					en: 'School is not only a place to study, but also a place to learn how to live.',
				},
				locale,
			),
			subtitle: getLocalizedValue(
				{ ru: 'Школа №37 города Нукус.', en: 'School No. 37 in Nukus.' },
				locale,
			),
			backgroundImage: mediaIds.homeHeroBackground,
			primaryCTA: {
				label: getLocalizedValue(
					{ ru: 'Познакомиться со школой', en: 'Get to know the school' },
					locale,
				),
				href: '/about',
			},
		},
		aboutPreview: {
			title: getLocalizedValue({ ru: 'О нас', en: 'About us' }, locale),
			description: getLocalizedValue(
				{
					ru: 'Мы — государственная школа, которая стремится обеспечить качественное образование для каждого ученика. Наша миссия заключается в развитии навыков и способностей детей, создании безопасной и поддерживающей атмосферы для роста.',
					en: 'We are a public school committed to providing quality education for every student. Our mission is to develop children’s strengths and abilities while creating a safe and supportive environment for growth.',
				},
				locale,
			),
			image: mediaIds.homeAboutImage,
			cta: {
				label: getLocalizedValue(
					{ ru: 'Узнать больше', en: 'Learn more' },
					locale,
				),
				href: '/about',
			},
		},
		studentLifePreview: {
			title: getLocalizedValue(
				{ ru: 'Жизнь учеников в школе', en: 'Student life at school' },
				locale,
			),
			description: getLocalizedValue(
				{
					ru: 'В нашей школе жизнь наполнена увлекательными событиями и возможностями для личностного роста. Учащиеся активно участвуют в мероприятиях, которые помогают раскрывать таланты и укреплять дружеские связи.',
					en: 'Life at our school is filled with engaging events and opportunities for personal growth. Students take an active part in activities that help develop their talents and build strong friendships.',
				},
				locale,
			),
			image: mediaIds.homeStudentLifeImage,
			cta: {
				label: getLocalizedValue(
					{ ru: 'Узнать больше', en: 'Learn more' },
					locale,
				),
				href: '/students',
			},
		},
		latestNews: {
			heading: getLocalizedValue(
				{ ru: 'Последние новости', en: 'Latest news' },
				locale,
			),
			buttonLabel: getLocalizedValue(
				{ ru: 'Все новости', en: 'All news' },
				locale,
			),
			buttonHref: '/news',
		},
		instagramCTA: {
			beforeLinkText: getLocalizedValue(
				{ ru: 'Подпишитесь на наш', en: 'Follow our' },
				locale,
			),
			linkLabel: getLocalizedValue(
				{ ru: 'инстаграм', en: 'Instagram' },
				locale,
			),
			linkURL: 'https://www.instagram.com/37shkola.nukus/',
			afterLinkText: getLocalizedValue(
				{
					ru: 'чтобы быть в курсе событий',
					en: 'to stay up to date with school events',
				},
				locale,
			),
		},
		contactSection: {
			title: getLocalizedValue(
				{ ru: 'Свяжитесь с нами!', en: 'Contact us!' },
				locale,
			),
			description: getLocalizedValue(
				{
					ru: 'Заполните форму, чтобы мы могли связаться с вами в ближайшее время.',
					en: 'Fill out the form and we will get back to you as soon as possible.',
				},
				locale,
			),
			submitButtonLabel: getLocalizedValue(
				{ ru: 'Отправить', en: 'Submit' },
				locale,
			),
		},
	}
}

function buildAboutPage(
	locale: SeedLocale,
	mediaIds: MediaIds,
): GlobalSeedDataMap['about-page'] {
	return {
		hero: {
			title: getLocalizedValue(
				{ ru: 'Наша школа', en: 'Our school' },
				locale,
			),
			subtitle: getLocalizedValue(
				{
					ru: 'Школа — не только место, где учат, но и где учатся жить.',
					en: 'School is not only a place to study, but also a place to learn how to live.',
				},
				locale,
			),
		},
		directorSection: {
			title: getLocalizedValue(
				{ ru: 'Наш директор', en: 'Our principal' },
				locale,
			),
			description: getLocalizedValue(
				{
					ru: 'Руководитель нашей школы вдохновляет, направляет и поддерживает развитие каждого ученика. Он верит в силу образования и в необходимость создавать среду, где есть место уважению, ответственности и инициативе.',
					en: 'The leader of our school inspires, guides, and supports the growth of every student. He believes in the power of education and in building an environment where respect, responsibility, and initiative can thrive.',
				},
				locale,
			),
			image: mediaIds.aboutDirectorImage,
		},
		valuesSection: {
			title: getLocalizedValue(
				{ ru: 'Принципы и ценности', en: 'Principles and values' },
				locale,
			),
			image: mediaIds.aboutValuesImage,
			values: aboutValues.map(value => ({
				label: getLocalizedValue(value, locale),
			})),
		},
		administrationSection: {
			title: getLocalizedValue(
				{ ru: 'Администрация школы', en: 'School administration' },
				locale,
			),
			description: getLocalizedValue(
				{
					ru: 'Администрация школы — это команда профессионалов, которая обеспечивает устойчивую работу школы, поддерживает учителей и помогает ученикам чувствовать себя уверенно в учебной среде.',
					en: 'The school administration is a team of professionals that keeps the school running smoothly, supports teachers, and helps students feel confident within the learning environment.',
				},
				locale,
			),
		},
	}
}

function withPreservedAboutPageArrayRowIds(
	data: GlobalSeedDataMap['about-page'],
	existing: Pick<AboutPage, 'valuesSection'>,
): GlobalSeedDataMap['about-page'] {
	return {
		...data,
		valuesSection: {
			...data.valuesSection,
			values: preserveArrayRowIds(
				data.valuesSection.values,
				existing.valuesSection.values,
			),
		},
	}
}

function buildNewsPage(locale: SeedLocale): GlobalSeedDataMap['news-page'] {
	return {
		title: getLocalizedValue(
			{ ru: 'Новости школы', en: 'School news' },
			locale,
		),
		description: getLocalizedValue(
			{
				ru: 'Следите за последними объявлениями, успехами учеников и школьными инициативами.',
				en: 'Follow the latest announcements, student achievements, and school initiatives.',
			},
			locale,
		),
	}
}

function buildEventsPage(locale: SeedLocale): GlobalSeedDataMap['events-page'] {
	return {
		title: getLocalizedValue(
			{ ru: 'События школы', en: 'School events' },
			locale,
		),
		description: getLocalizedValue(
			{
				ru: 'Календарь важных встреч, праздников и школьных инициатив.',
				en: 'A calendar of important meetings, celebrations, and school initiatives.',
			},
			locale,
		),
	}
}

function buildTeamPage(locale: SeedLocale): GlobalSeedDataMap['team-page'] {
	return {
		title: getLocalizedValue(
			{ ru: 'Учителя и команда школы', en: 'Teachers and school team' },
			locale,
		),
		description: getLocalizedValue(
			{
				ru: 'Здесь вы познакомитесь с учителями и сотрудниками нашей школы.',
				en: 'Here you can meet the teachers and staff members of our school.',
			},
			locale,
		),
	}
}

function buildNewsItem(
	item: NewsItemSeed,
	locale: SeedLocale,
	mediaIds: MediaIds,
): CollectionSeedDataMap['news'] {
	return {
		title: getLocalizedValue(item.title, locale),
		slug: item.slug,
		featuredImage: mediaIds.newsCoverImage,
		publishedAt: toSeedDate(item.publishedAt),
		description: getLocalizedValue(item.description, locale),
		isFeatured: item.isFeatured,
		content: getLocalizedValue(item.content, locale),
	}
}

function buildEventItem(
	item: EventItemSeed,
	locale: SeedLocale,
	mediaIds: MediaIds,
): CollectionSeedDataMap['events'] {
	return {
		title: getLocalizedValue(item.title, locale),
		slug: item.slug,
		coverImage: mediaIds.homeStudentLifeImage,
		startDate: toSeedDate(item.startDate),
		endDate: null,
		location: getLocalizedValue(item.location, locale),
		isFeatured: item.isFeatured,
		content: getLocalizedValue(item.content, locale),
	}
}

function buildTeamMember(
	member: TeamMemberSeed,
	locale: SeedLocale,
	mediaIds: MediaIds,
): CollectionSeedDataMap['team-members'] {
	return {
		fullName: member.fullName,
		slug: member.slug,
		roleType: member.roleType,
		photo: mediaIds.teamProfileImage,
		position: getLocalizedValue(member.position, locale),
		bio: getLocalizedValue(member.bio, locale),
	}
}

async function seedGlobal(
	payload: PayloadInstance,
	slug: 'site-settings',
	locale: SeedLocale,
	data: GlobalSeedDataMap['site-settings'],
): Promise<void>
async function seedGlobal(
	payload: PayloadInstance,
	slug: 'homepage',
	locale: SeedLocale,
	data: GlobalSeedDataMap['homepage'],
): Promise<void>
async function seedGlobal(
	payload: PayloadInstance,
	slug: 'about-page',
	locale: SeedLocale,
	data: GlobalSeedDataMap['about-page'],
): Promise<void>
async function seedGlobal(
	payload: PayloadInstance,
	slug: 'news-page',
	locale: SeedLocale,
	data: GlobalSeedDataMap['news-page'],
): Promise<void>
async function seedGlobal(
	payload: PayloadInstance,
	slug: 'events-page',
	locale: SeedLocale,
	data: GlobalSeedDataMap['events-page'],
): Promise<void>
async function seedGlobal(
	payload: PayloadInstance,
	slug: 'team-page',
	locale: SeedLocale,
	data: GlobalSeedDataMap['team-page'],
): Promise<void>
async function seedGlobal(
	payload: PayloadInstance,
	slug: GlobalSlug,
	locale: SeedLocale,
	data: GlobalSeedDataMap[GlobalSlug],
) {
	switch (slug) {
		case 'site-settings':
			await payload.updateGlobal({
				slug: 'site-settings',
				data: data as GlobalSeedDataMap['site-settings'],
				locale,
				overrideAccess: true,
			})
			return
		case 'homepage':
			await payload.updateGlobal({
				slug: 'homepage',
				data: data as GlobalSeedDataMap['homepage'],
				locale,
				overrideAccess: true,
			})
			return
		case 'about-page':
			await payload.updateGlobal({
				slug: 'about-page',
				data: data as GlobalSeedDataMap['about-page'],
				locale,
				overrideAccess: true,
			})
			return
		case 'news-page':
			await payload.updateGlobal({
				slug: 'news-page',
				data: data as GlobalSeedDataMap['news-page'],
				locale,
				overrideAccess: true,
			})
			return
		case 'events-page':
			await payload.updateGlobal({
				slug: 'events-page',
				data: data as GlobalSeedDataMap['events-page'],
				locale,
				overrideAccess: true,
			})
			return
		case 'team-page':
			await payload.updateGlobal({
				slug: 'team-page',
				data: data as GlobalSeedDataMap['team-page'],
				locale,
				overrideAccess: true,
			})
			return
	}
}

async function upsertBySlug(
	payload: PayloadInstance,
	collection: 'news',
	locale: SeedLocale,
	slug: string,
	data: CollectionSeedDataMap['news'],
): Promise<void>
async function upsertBySlug(
	payload: PayloadInstance,
	collection: 'events',
	locale: SeedLocale,
	slug: string,
	data: CollectionSeedDataMap['events'],
): Promise<void>
async function upsertBySlug(
	payload: PayloadInstance,
	collection: 'team-members',
	locale: SeedLocale,
	slug: string,
	data: CollectionSeedDataMap['team-members'],
): Promise<void>
async function upsertBySlug(
	payload: PayloadInstance,
	collection: CollectionSlug,
	locale: SeedLocale,
	slug: string,
	data: CollectionSeedDataMap[CollectionSlug],
) {
	switch (collection) {
		case 'news': {
			const existing = await payload.find({
				collection: 'news',
				limit: 1,
				locale,
				overrideAccess: true,
				where: {
					slug: {
						equals: slug,
					},
				},
			})

			if (existing.docs[0]) {
				await payload.update({
					collection: 'news',
					id: existing.docs[0].id,
					data: data as CollectionSeedDataMap['news'],
					locale,
					overrideAccess: true,
				})
				return
			}

			await payload.create({
				collection: 'news',
				data: data as CollectionSeedDataMap['news'],
				draft: false,
				locale,
				overrideAccess: true,
			})
			return
		}

		case 'events': {
			const existing = await payload.find({
				collection: 'events',
				limit: 1,
				locale,
				overrideAccess: true,
				where: {
					slug: {
						equals: slug,
					},
				},
			})

			if (existing.docs[0]) {
				await payload.update({
					collection: 'events',
					id: existing.docs[0].id,
					data: data as CollectionSeedDataMap['events'],
					locale,
					overrideAccess: true,
				})
				return
			}

			await payload.create({
				collection: 'events',
				data: data as CollectionSeedDataMap['events'],
				draft: false,
				locale,
				overrideAccess: true,
			})
			return
		}

		case 'team-members': {
			const existing = await payload.find({
				collection: 'team-members',
				limit: 1,
				locale,
				overrideAccess: true,
				where: {
					slug: {
						equals: slug,
					},
				},
			})

			if (existing.docs[0]) {
				await payload.update({
					collection: 'team-members',
					id: existing.docs[0].id,
					data: data as CollectionSeedDataMap['team-members'],
					locale,
					overrideAccess: true,
				})
				return
			}

			await payload.create({
				collection: 'team-members',
				data: data as CollectionSeedDataMap['team-members'],
				draft: false,
				locale,
				overrideAccess: true,
			})
		}
	}
}

async function seedGlobals(payload: PayloadInstance, mediaIds: MediaIds) {
	await seedGlobal(
		payload,
		'site-settings',
		DEFAULT_LOCALE,
		buildSiteSettings(DEFAULT_LOCALE, mediaIds),
	)
	await seedGlobal(
		payload,
		'homepage',
		DEFAULT_LOCALE,
		buildHomepage(DEFAULT_LOCALE, mediaIds),
	)
	await seedGlobal(
		payload,
		'about-page',
		DEFAULT_LOCALE,
		buildAboutPage(DEFAULT_LOCALE, mediaIds),
	)
	await seedGlobal(
		payload,
		'news-page',
		DEFAULT_LOCALE,
		buildNewsPage(DEFAULT_LOCALE),
	)
	await seedGlobal(
		payload,
		'events-page',
		DEFAULT_LOCALE,
		buildEventsPage(DEFAULT_LOCALE),
	)
	await seedGlobal(
		payload,
		'team-page',
		DEFAULT_LOCALE,
		buildTeamPage(DEFAULT_LOCALE),
	)

	const seededSiteSettings = await payload.findGlobal({
		slug: 'site-settings',
		locale: DEFAULT_LOCALE,
		overrideAccess: true,
	})
	const seededAboutPage = await payload.findGlobal({
		slug: 'about-page',
		locale: DEFAULT_LOCALE,
		overrideAccess: true,
	})

	for (const locale of LOCALES.filter(locale => locale !== DEFAULT_LOCALE)) {
		await seedGlobal(
			payload,
			'site-settings',
			locale,
			withPreservedSiteSettingsArrayRowIds(
				buildSiteSettings(locale, mediaIds),
				seededSiteSettings,
			),
		)
		await seedGlobal(
			payload,
			'homepage',
			locale,
			buildHomepage(locale, mediaIds),
		)
		await seedGlobal(
			payload,
			'about-page',
			locale,
			withPreservedAboutPageArrayRowIds(
				buildAboutPage(locale, mediaIds),
				seededAboutPage,
			),
		)
		await seedGlobal(payload, 'news-page', locale, buildNewsPage(locale))
		await seedGlobal(payload, 'events-page', locale, buildEventsPage(locale))
		await seedGlobal(payload, 'team-page', locale, buildTeamPage(locale))
	}
}

async function seedNews(payload: PayloadInstance, mediaIds: MediaIds) {
	for (const item of newsItems) {
		for (const locale of LOCALES) {
			await upsertBySlug(
				payload,
				'news',
				locale,
				item.slug,
				buildNewsItem(item, locale, mediaIds),
			)
		}
	}
}

async function seedEvents(payload: PayloadInstance, mediaIds: MediaIds) {
	for (const item of eventItems) {
		for (const locale of LOCALES) {
			await upsertBySlug(
				payload,
				'events',
				locale,
				item.slug,
				buildEventItem(item, locale, mediaIds),
			)
		}
	}
}

async function seedTeamMembers(payload: PayloadInstance, mediaIds: MediaIds) {
	for (const member of [...administrationMembers, ...teacherMembers]) {
		for (const locale of LOCALES) {
			await upsertBySlug(
				payload,
				'team-members',
				locale,
				member.slug,
				buildTeamMember(member, locale, mediaIds),
			)
		}
	}
}

export async function runSeed(options: SeedRunOptions = {}) {
	console.log('Starting seed script...')
	console.log(
		`Database env: ${
			process.env.POSTGRES_URL
				? 'POSTGRES_URL'
				: process.env.DATABASE_URL
					? 'DATABASE_URL'
					: 'missing'
		}`,
	)
	console.log(
		`Blob token: ${process.env.BLOB_READ_WRITE_TOKEN ? 'present' : 'missing'}`,
	)
	console.log('Initializing Payload...')

	const payload = await getPayload({ config })

	const tempDir = await fs.mkdtemp(
		path.join(os.tmpdir(), 'pushkin-school-37-seed-'),
	)

	try {
		console.log('Payload initialized. Seeding content for ru and en...')
		if (options.assetBaseURL) {
			console.log(`Seeding media from remote assets at ${options.assetBaseURL}`)
		}

		const mediaIds = {} as MediaIds

		console.log('Seeding media...')
		for (const [key, definition] of Object.entries(mediaDefinitions) as [
			MediaKey,
			SeedMediaDefinition,
		][]) {
			mediaIds[key] = await ensureMedia(
				payload,
				tempDir,
				definition,
				options.assetBaseURL,
			)
		}

		console.log('Seeding globals...')
		await seedGlobals(payload, mediaIds)
		console.log('Seeding news...')
		await seedNews(payload, mediaIds)
		console.log('Seeding events...')
		await seedEvents(payload, mediaIds)
		console.log('Seeding team members...')
		await seedTeamMembers(payload, mediaIds)

		console.log(`Seed completed successfully at ${RUN_TIMESTAMP}`)
	} finally {
		await fs.rm(tempDir, { force: true, recursive: true })
		await payload.destroy()
	}
}

if (process.argv.includes('seed-prod')) {
	try {
		await runSeed()
	} catch (error) {
		console.error('Production seed failed.')
		console.error(error)
		process.exit(1)
	}
}
