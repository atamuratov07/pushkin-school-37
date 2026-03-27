import { isLocale } from '@/i18n/config'
import { getMediaUrl } from '@/shared/lib/media'
import { getPayloadClient } from '@/shared/lib/payload'
import { notFound } from 'next/navigation'
import { NewsCard } from './NewsCard'

export default async function NewsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	if (!isLocale(locale)) notFound()

	const payload = await getPayloadClient()
	const [pageData, newsResult] = await Promise.all([
		payload.findGlobal({
			slug: 'news-page',
			locale,
			overrideAccess: false,
		}),
		payload.find({
			collection: 'news',
			locale,
			depth: 1,
			overrideAccess: false,
			sort: '-publishedAt',
		}),
	])

	return (
		<main className='flex flex-col items-center'>
			<section className='w-full'>
				<div className='container mx-auto px-5 py-15 text-center md:py-12'>
					<h1 className='text-[24px] font-bold leading-[1.2] text-black md:text-[40px]'>
						{pageData.title}
					</h1>
					{pageData.description ? (
						<p className='mt-4 text-base text-black/70 md:text-lg'>
							{pageData.description}
						</p>
					) : null}
				</div>
			</section>
			<section className='relative w-full pt-28'>
				<div className='absolute -z-1 inset-0 max-h-[110vh] bg-[#00014D]'></div>
				<div className='md:px-5 mx-auto'>
					<ul className='flex flex-col md:gap-12 max-w-210 mx-auto'>
						{newsResult.docs.map(item => (
							<li key={item.id}>
								<NewsCard
									imageUrl={getMediaUrl(item.featuredImage)}
									title={item.title}
									description={item.description}
									date={item.publishedAt}
									locale={locale}
								/>
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	)
}
