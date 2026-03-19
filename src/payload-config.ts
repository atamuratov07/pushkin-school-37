import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { ru } from '@payloadcms/translations/languages/ru'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media.ts'
import { Users } from './collections/Users.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProd = process.env.NODE_ENV === 'production'
const useVercelPostgres = isProd && !!process.env.POSTGRES_URL

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media],
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: useVercelPostgres
		? vercelPostgresAdapter()
		: postgresAdapter({
				pool: { connectionString: process.env.DATABASE_URL || '' },
			}),
	sharp,
	i18n: {
		fallbackLanguage: 'ru',
		supportedLanguages: { ru, en },
	},
	localization: {
		locales: [
			{
				code: 'ru',
				label: 'Russian',
			},
			{
				code: 'en',
				label: 'English',
				fallbackLocale: 'ru',
			},
		],
		defaultLocale: 'ru',
		fallback: true,
	},

	plugins: [
		vercelBlobStorage({
			collections: {
				media: true,
			},
			token: process.env.BLOB_READ_WRITE_TOKEN,
			clientUploads: true,
		}),
	],
})
