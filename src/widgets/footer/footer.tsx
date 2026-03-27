import type { Locale } from '@/i18n/config'
import type { SiteSetting } from '@/payload-types'
import { ImageFallback } from '@/shared/components/ui/image-fallback'
import { getMediaAlt, getMediaUrl } from '@/shared/lib/media'
import { resolveHref } from '@/shared/lib/utils'

export function Footer({
	siteSettings,
	locale,
}: {
	siteSettings: SiteSetting
	locale: Locale
}) {
	const navItems =
		siteSettings.footerNavigation?.map(item => ({
			title: item.label,
			href: resolveHref(locale, item.href),
		})) ?? []

	const socialLinks =
		siteSettings.socialLinks?.map(link => ({
			title: link.label,
			href: resolveHref(locale, link.href),
		})) ?? []

	const logoRelation = siteSettings.logoLight ?? siteSettings.logo
	const logoUrl = getMediaUrl(logoRelation)
	const logoAlt = getMediaAlt(logoRelation, siteSettings.schoolName)

	return (
		<div className='w-full px-10 pt-18 pb-25 bg-[#1D519A] mt-30 md:mt-40'>
			<div className='container mx-auto'>
				<div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
					<div className='flex flex-row flex-nowrap items-center gap-2.5'>
						<ImageFallback
							src={logoUrl}
							width={80}
							height={80}
							alt={logoAlt}
							fallbackClassName='size-20'
						/>
						<div className='text-white flex flex-col justify-baseline'>
							<span className='font-semibold text-xl'>
								{siteSettings.schoolName}
							</span>
							<span className='font-normal text-sm'>
								{siteSettings.schoolSubtitle ?? ''}
							</span>
						</div>
					</div>
					<ul className='flex flex-col items-center md:items-start md:flex-row gap-12 text-center md:text-start'>
						<li className=''>
							<span className='text-[#9AD8FF] text-lg font-semibold'>
								{siteSettings.footerQuickLinksTitle}
							</span>
							<ul className='mt-5 text-white w-full grid grid-cols-2 gap-x-5 gap-y-4'>
								{navItems.map((item, i) => (
									<li key={i}>
										<a href={item.href} className='hover:underline'>
											{item.title}
										</a>
									</li>
								))}
							</ul>
						</li>
						<li className=''>
							<span className='text-[#9AD8FF] text-lg font-semibold'>
								{siteSettings.footerSocialTitle}
							</span>
							<ul className='mt-5 w-full text-white font-medium flex flex-col gap-5'>
								{socialLinks.map((link, i) => (
									<li key={i}>
										<a href={link.href} className='hover:underline'>
											{link.title}
										</a>
									</li>
								))}
							</ul>
						</li>
						<li>
							<span className='text-[#9AD8FF] text-lg font-semibold'>
								{siteSettings.footerAddressTitle}
							</span>
							<p className='mt-5 text-white font-medium'>
								{siteSettings.address}
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
