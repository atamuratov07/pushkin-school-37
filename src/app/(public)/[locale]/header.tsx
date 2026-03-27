import type { Locale } from '@/i18n/config'
import type { SiteSetting } from '@/payload-types'
import { getMediaAlt, getMediaUrl } from '@/shared/lib/media'
import { resolveHref } from '@/shared/lib/utils'
import Image from 'next/image'
import MobileNav from './mobile-nav'
import Nav, { type NavItem } from './nav'

export default function Header({
	siteSettings,
	locale,
}: {
	siteSettings: SiteSetting
	locale: Locale
}) {
	const navItems: NavItem[] =
		siteSettings.headerNavigation?.map(item => ({
			label: item.label,
			href: resolveHref(locale, item.href),
		})) ?? []

	const logoUrl = getMediaUrl(siteSettings.logo) ?? '/icons/logo.svg'
	const logoAlt = getMediaAlt(siteSettings.logo, siteSettings.schoolName)

	return (
		<header className=''>
			<div className='mx-auto'>
				<div className='flex py-3 px-5 items-center justify-between sm:justify-center'>
					<div className='flex items-center gap-2'>
						<Image
							className='h-12 w-12'
							src={logoUrl}
							alt={logoAlt}
							width={80}
							height={80}
							priority
						/>
						<div>
							<h3 className='text-base font-semibold text-slate-900'>
								{siteSettings.schoolName}
							</h3>
							<span className='text-xs text-slate-500'>
								{siteSettings.schoolSubtitle ?? ''}
							</span>
						</div>
					</div>
					<MobileNav items={navItems} />
				</div>
				<div className='hidden sm:block'>
					<Nav items={navItems} />
				</div>
			</div>
		</header>
	)
}
