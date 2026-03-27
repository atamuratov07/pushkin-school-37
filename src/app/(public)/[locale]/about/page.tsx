import { isLocale } from '@/i18n/config'
import { ImageFallback } from '@/shared/components/ui/image-fallback'
import { getMediaAlt, getMediaUrl } from '@/shared/lib/media'
import { getPayloadClient } from '@/shared/lib/payload'
import { notFound } from 'next/navigation'
import { AdminMemberCard } from './AdminMemberCard'

export default async function AboutPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	if (!isLocale(locale)) notFound()

	const payload = await getPayloadClient()
	const [pageData, adminsResult] = await Promise.all([
		payload.findGlobal({
			slug: 'about-page',
			locale,
			depth: 1,
			overrideAccess: false,
		}),
		payload.find({
			collection: 'team-members',
			locale,
			depth: 1,
			overrideAccess: false,
			sort: 'fullName',
			where: {
				roleType: {
					equals: 'administration',
				},
			},
		}),
	])

	const directorImageUrl = getMediaUrl(pageData.directorSection.image)
	const directorImageAlt = getMediaAlt(
		pageData.directorSection.image,
		pageData.directorSection.title,
	)
	const valuesImageUrl = getMediaUrl(pageData.valuesSection.image)
	const valuesImageAlt = getMediaAlt(
		pageData.valuesSection.image,
		pageData.valuesSection.title,
	)

	return (
		<main className='flex flex-col items-center justify-center'>
			<section className='relative w-full min-h-70 md:min-h-100 justify-center'>
				<div className='container mx-auto px-0 sm:px-10'>
					<div className='mt-20 md:mt-30 text-center'>
						<h1 className='text-black leading-[1.2] text-[24px] md:text-[40px] font-semibold'>
							{pageData.hero.title}
						</h1>
						<h3 className='text-[20px] md:text-[30px] leading-[1.2] font-medium text-black mt-5'>
							{pageData.hero.subtitle}
						</h3>
					</div>
				</div>
			</section>
			<section className='w-full'>
				<div className='w-full grid grid-cols-[1fr] md:justify-center md:grid-cols-[minmax(0,680px)_minmax(0,680px)]'>
					<div className='order-2 md:order-1'>
						<ImageFallback
							src={directorImageUrl}
							width={720}
							height={450}
							alt={directorImageAlt}
							className='w-full h-full max-h-130 object-cover'
							fallbackClassName='w-full h-full min-h-100 max-h-130'
						/>
					</div>
					<div className='w-full order-1 md:order-2 bg-[#00014D] py-10 px-10 md:py-17 md:px-17'>
						<div className='max-w-200 flex flex-col items-center 2xl:items-baseline gap-14'>
							<h4 className='text-white text-xl lg:text-3xl font-semibold'>
								{pageData.directorSection.title}
							</h4>
							<p className='text-white text-center 2xl:text-start text-sm lg:text-xl'>
								{pageData.directorSection.description}
							</p>
						</div>
					</div>
				</div>
				<div className='w-full grid grid-cols-[1fr] md:justify-center md:grid-cols-[minmax(0,680px)_minmax(0,680px)]'>
					<div className='w-full bg-[#00014D] py-10 px-10 md:py-17 md:px-17'>
						<div className='max-w-200 flex flex-col items-center 2xl:items-baseline gap-14'>
							<h4 className='text-white text-xl lg:text-3xl font-semibold'>
								{pageData.valuesSection.title}
							</h4>
							<ul className='mx-auto list-disc text-white text-left text-sm lg:text-xl space-y-2 pl-5'>
								{pageData.valuesSection.values?.map(item => (
									<li key={item.id ?? item.label}>{item.label}</li>
								))}
							</ul>
						</div>
					</div>
					<div className='w-full'>
						<ImageFallback
							src={valuesImageUrl}
							width={720}
							height={450}
							alt={valuesImageAlt}
							className='w-full h-full max-h-130 object-cover'
							fallbackClassName='w-full h-full min-h-100 max-h-130'
						/>
					</div>
				</div>
			</section>
			<section className='w-full py-17.5'>
				<div className='max-w-3xl mx-auto px-9 py-16 md:pt-32 text-center'>
					<h2 className='text-3xl md:text-[40px] font-semibold'>
						{pageData.administrationSection.title}
					</h2>
					<p className='mt-7 text-sm font-medium'>
						{pageData.administrationSection.description}
					</p>
				</div>
				<div className='max-w-384 mx-auto px-5 md:px-10'>
					<ul className='w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-4 gap-y-10 md:gap-y-30'>
						{adminsResult.docs.map(member => (
							<li key={member.id} className='flex justify-center'>
								<AdminMemberCard
									name={member.fullName}
									position={member.position}
									profileImageSrc={getMediaUrl(member.photo)}
								/>
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	)
}
