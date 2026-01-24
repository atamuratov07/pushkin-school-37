import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import '../globals.css'
import Header from './header'

const poppins = Poppins({
	display: 'swap',
	weight: ['400', '500', '600', '700'],
	variable: '--font-primary',
	subsets: ['latin'],
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
			<body className={`${poppins.variable} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	)
}
