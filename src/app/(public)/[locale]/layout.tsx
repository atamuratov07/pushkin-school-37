import { isLocale } from '@/i18n/config'
import { getPayloadClient } from '@/shared/lib/payload'
import { Footer } from '@/widgets/footer/footer'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import './globals.css'
import Header from './header'

const montserrat = Montserrat({
	display: 'swap',
	weight: ['400', '500', '600', '700'],
	variable: '--font-secondary',
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: 'Pushkin School No. 37',
	description: '',
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params

	if (!isLocale(locale)) notFound()

	const payload = await getPayloadClient()
	const siteSettings = await payload.findGlobal({
		slug: 'site-settings',
		locale,
		depth: 1,
		overrideAccess: false,
	})

	return (
		<html lang={locale}>
			<body className={`${montserrat.className} antialiased`}>
				<Header siteSettings={siteSettings} locale={locale} />
				{children}
				<Footer siteSettings={siteSettings} locale={locale} />
			</body>
		</html>
	)
}
