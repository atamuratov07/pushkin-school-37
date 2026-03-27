import { isLocale } from '@/i18n/config'
import { getPayloadClient } from '@/shared/lib/payload'
import { notFound } from 'next/navigation'
import { EventCard } from './EventCard'

export default async function EventsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	if (!isLocale(locale)) notFound()

	const payload = await getPayloadClient()
	const [pageData, eventsResult] = await Promise.all([
		payload.findGlobal({
			slug: 'events-page',
			locale,
			overrideAccess: false,
		}),
		payload.find({
			collection: 'events',
			locale,
			depth: 1,
			overrideAccess: false,
			sort: 'startDate',
		}),
	])

	return (
		<main className='flex flex-col items-center'>
			<section className='w-full px-5'>
				<div className='mx-auto my-17 px-10 text-center'>
					<h1 className='text-3xl md:text-[40px] font-bold leading-[1.2] text-black'>
						{pageData.title}
					</h1>
					{pageData.description ? (
						<p className='mt-4 text-base text-black/70 md:text-lg'>
							{pageData.description}
						</p>
					) : null}
				</div>
			</section>
			<section className='w-full bg-[#00014D] pt-35 pb-20 flex justify-center'>
				<div className='container bg-white py-5 px-5 md:py-8 md:px-10 mx-10'>
					<ul className='divide-y divide-black border-y border-black'>
						{eventsResult.docs.map(event => (
							<li key={event.id}>
								<EventCard
									title={event.title}
									location={event.location}
									date={event.startDate}
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
