import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '../globals.css'
import Header from './header'
import { Footer } from '@/widgets/footer/footer'

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${montserrat.className} antialiased`}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
