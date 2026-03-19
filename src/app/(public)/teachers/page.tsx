import { TeacherCard } from './TeacherCard'

const teachers = Array.from({ length: 8 }, () => ({
	name: 'Миртурды Досназаров',
	position: 'Директор',
	profileImageSrc: '/images/shared/profile.jpg',
}))

export default function TeachersPage() {
	return (
		<main className='flex flex-col items-center'>
			<section className='w-full px-5'>
				<div className='mx-auto px-10 mt-14 md:mt-24 mb-21 md:mb-16 text-center'>
					<h1 className='text-2xl md:text-[40px] font-bold leading-[1.2] text-black'>
						Учителя — проводники к будущему!
					</h1>
					<h3 className='text-base md:text-2xl inline-block mt-1 leading-[1.2] font-medium text-black'>
						Сдесь вы познакомитесь с учителями и заведущими нашей школы
					</h3>
				</div>
			</section>
			<section className='relative w-full pt-18'>
				<div className='max-w-384 mx-auto px-5 md:px-10'>
					<ul className='w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-4 gap-y-10 md:gap-y-30'>
						{teachers.map((member, i) => (
							<li
								key={`${member.name}-${i}`}
								className='flex justify-center'
							>
								<TeacherCard {...member} />
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	)
}
