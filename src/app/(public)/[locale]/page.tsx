import { isLocale } from '@/i18n/config'
import { Button } from '@/shared/components/ui/button'
import { ImageFallback } from '@/shared/components/ui/image-fallback'
import { Separator } from '@/shared/components/ui/separator'
import { getMediaAlt, getMediaUrl } from '@/shared/lib/media'
import { getPayloadClient } from '@/shared/lib/payload'
import { formatLocalizedDate, resolveHref } from '@/shared/lib/utils'
import { ContactForm } from '@/widgets/form/form'
import { notFound } from 'next/navigation'

export default async function HomePage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	if (!isLocale(locale)) notFound()

	const payload = await getPayloadClient()
	const [homepage, newsResult] = await Promise.all([
		payload.findGlobal({
			slug: 'homepage',
			locale,
			depth: 1,
			overrideAccess: false,
		}),
		payload.find({
			collection: 'news',
			locale,
			depth: 1,
			overrideAccess: false,
			sort: '-publishedAt',
			limit: 3,
		}),
	])

	const heroBackgroundUrl = getMediaUrl(homepage.hero.backgroundImage)
	const heroStyle = heroBackgroundUrl
		? {
				backgroundImage: `linear-gradient(rgba(0, 3, 167, 0.4), rgba(0, 3, 167, 0.4)), url("${heroBackgroundUrl}")`,
			}
		: undefined

	const aboutImageUrl = getMediaUrl(homepage.aboutPreview.image)
	const aboutImageAlt = getMediaAlt(
		homepage.aboutPreview.image,
		homepage.aboutPreview.title,
	)
	const studentLifeImageUrl = getMediaUrl(homepage.studentLifePreview.image)
	const studentLifeImageAlt = getMediaAlt(
		homepage.studentLifePreview.image,
		homepage.studentLifePreview.title,
	)

	return (
		<main className='flex flex-col items-center justify-center'>
			<section
				style={heroStyle}
				className='relative w-full h-[80vh] min-h-150 max-h-182.5 justify-center bg-cover bg-center bg-no-repeat'
			>
				<div className='container mx-auto px-0 sm:px-10'>
					<div className='w-full max-w-180 bg-[#0003A7C9] py-15 px-10 sm:mt-25 flex flex-col gap-7.5 items-center sm:items-start sm:rounded-sm'>
						<h1 className='text-white text-center sm:text-left leading-[1.2] text-[24px] md:text-[40px] font-bold'>
							{homepage.hero.title}
						</h1>
						<h3 className='text-[20px] md:text-[30px] leading-[1.2] font-medium text-white'>
							{homepage.hero.subtitle}
						</h3>
						<Button
							asChild
							className='bg-black p-3.75 md:py-6.5 md:px-9 text-base md:text-lg h-auto rounded-sm'
						>
							<a href={resolveHref(locale, homepage.hero.primaryCTA.href)}>
								{homepage.hero.primaryCTA.label}
							</a>
						</Button>
					</div>
				</div>
			</section>
			<section className='w-full'>
				<div className='w-full grid grid-cols-[1fr] md:grid-cols-[1fr_1fr]'>
					<div className='w-full order-2 md:order-1'>
						<ImageFallback
							src={aboutImageUrl}
							width={720}
							height={450}
							alt={aboutImageAlt}
							className='w-full h-full max-h-112.5 object-cover'
							fallbackClassName='w-full h-full min-h-100 max-h-112.5'
						/>
					</div>
					<div className='w-full order-1 md:order-2 bg-[#00014D] py-10 px-10 md:py-12.5'>
						<div className='max-w-200 flex flex-col items-center 2xl:items-baseline gap-10'>
							<h4 className='text-white text-xl lg:text-3xl font-semibold'>
								{homepage.aboutPreview.title}
							</h4>
							<p className='text-white text-center 2xl:text-start text-sm lg:text-xl'>
								{homepage.aboutPreview.description}
							</p>
							<Button
								asChild
								className='bg-[#484BFF] text-white text-medium text-sm md:text-lg py-4 px-11 md:py-5 md:px-7 rounded-sm'
							>
								<a href={resolveHref(locale, homepage.aboutPreview.cta.href)}>
									{homepage.aboutPreview.cta.label}
								</a>
							</Button>
						</div>
					</div>
				</div>
				<div className='w-full grid grid-cols-[1fr] md:grid-cols-[1fr_1fr]'>
					<div className='w-full bg-[#00014D] py-10 px-10 md:py-12.5 flex justify-end'>
						<div className='max-w-200 flex flex-col items-center 2xl:items-end gap-10'>
							<h4 className='text-white text-xl lg:text-3xl font-semibold'>
								{homepage.studentLifePreview.title}
							</h4>
							<p className='text-white text-center 2xl:text-end text-sm lg:text-xl'>
								{homepage.studentLifePreview.description}
							</p>
							<Button
								asChild
								className='bg-[#484BFF] text-white text-medium text-sm md:text-lg py-4 px-11 md:py-5 md:px-7 rounded-sm'
							>
								<a
									href={resolveHref(locale, homepage.studentLifePreview.cta.href)}
								>
									{homepage.studentLifePreview.cta.label}
								</a>
							</Button>
						</div>
					</div>
					<div className='w-full'>
						<ImageFallback
							src={studentLifeImageUrl}
							width={720}
							height={450}
							alt={studentLifeImageAlt}
							className='w-full h-full max-h-112.5 object-cover'
							fallbackClassName='w-full h-full min-h-100 max-h-112.5'
						/>
					</div>
				</div>
			</section>
			<section className='w-full'>
				<div className='container mx-auto pt-28 pb-9 sm:pb-16 md:pt-25 md:pb-22.5'>
					<h2 className='text-3xl md:text-[40px] font-bold text-center'>
						{homepage.latestNews.heading}
					</h2>
				</div>
				<div className='container mx-auto flex flex-col items-center'>
					<ul className='w-full grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5'>
						{newsResult.docs.map(item => {
							const coverUrl = getMediaUrl(item.featuredImage)
							const style = coverUrl
								? {
										backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("${coverUrl}")`,
									}
								: undefined

							return (
								<li key={item.id}>
									<div
										style={style}
										className='flex flex-col gap-5 md:gap-15 max-w-screen min-h-65 p-6 pb-20 bg-cover bg-center bg-no-repeat text-white bg-[#1D519A]'
									>
										<span className='text-sm'>
											{formatLocalizedDate(item.publishedAt, locale)}
										</span>
										<h3 className='font-medium text-xl md:text-3xl'>
											{item.title}
										</h3>
										<Separator />
									</div>
								</li>
							)
						})}
					</ul>
					<Button
						asChild
						className='bg-black p-3.75 mt-7.5 md:mt-17.5 md:py-6.5 md:px-9 text-base md:text-lg h-auto rounded-sm'
					>
						<a href={resolveHref(locale, homepage.latestNews.buttonHref)}>
							{homepage.latestNews.buttonLabel}
						</a>
					</Button>
				</div>
			</section>
			<section className='w-full'>
				<div className='text-center pt-32 pb-4 md:py-23 px-10'>
					<p className='font-bold text-xl md:text-3xl text-black'>
						{homepage.instagramCTA.beforeLinkText}{' '}
						<a
							href={homepage.instagramCTA.linkURL}
							target='_blank'
							rel='noreferrer'
							className='text-[#007CC9] underline hover:underline-offset-6'
						>
							{homepage.instagramCTA.linkLabel}
						</a>{' '}
						{homepage.instagramCTA.afterLinkText ?? ''}
					</p>
				</div>
			</section>
			<section className='w-full py-5 md:py-20 bg-[#1D519A] flex justify-center'>
				<ContactForm
					title={homepage.contactSection.title}
					description={homepage.contactSection.description}
					submitLabel={homepage.contactSection.submitButtonLabel}
				/>
			</section>
		</main>
	)
}
