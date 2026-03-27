import { isLocale } from '@/i18n/config'
import { getMediaUrl } from '@/shared/lib/media'
import { getPayloadClient } from '@/shared/lib/payload'
import { notFound } from 'next/navigation'
import { TeacherCard } from './TeacherCard'

export default async function TeachersPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	if (!isLocale(locale)) notFound()

	const payload = await getPayloadClient()
	const [pageData, teachersResult] = await Promise.all([
		payload.findGlobal({
			slug: 'team-page',
			locale,
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
					equals: 'teacher',
				},
			},
		}),
	])

	return (
		<main className='flex flex-col items-center'>
			<section className='w-full px-5'>
				<div className='mx-auto px-10 mt-14 md:mt-24 mb-21 md:mb-16 text-center'>
					<h1 className='text-2xl md:text-[40px] font-bold leading-[1.2] text-black'>
						{pageData.title}
					</h1>
					{pageData.description ? (
						<h3 className='text-base md:text-2xl inline-block mt-1 leading-[1.2] font-medium text-black'>
							{pageData.description}
						</h3>
					) : null}
				</div>
			</section>
			<section className='relative w-full pt-18'>
				<div className='max-w-384 mx-auto px-5 md:px-10'>
					<ul className='w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-4 gap-y-10 md:gap-y-30'>
						{teachersResult.docs.map(member => (
							<li key={member.id} className='flex justify-center'>
								<TeacherCard
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
