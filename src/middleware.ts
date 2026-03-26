import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, isLocale } from './i18n/config'

const PUBLIC_FILE = /\.[^/]+$/

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (
		pathname.startsWith('/api') ||
		pathname.startsWith('/admin') ||
		pathname.startsWith('/_next') ||
		PUBLIC_FILE.test(pathname)
	) {
		return NextResponse.next()
	}
	const maybeLocale = pathname.split('/')[1]
	if (isLocale(maybeLocale)) {
		return NextResponse.next()
	}
	return NextResponse.redirect(
		new URL(`/${defaultLocale}${pathname}`, request.url),
	)
}

export const config = {
	matcher: ['/((?!_next|api|admin|.*\\..*).*)'],
}
