import Image from 'next/image'

import { AdminMemberCard } from './AdminMemberCard'

const adminMembers = Array.from({ length: 8 }, () => ({
	name: 'Миртурды Досназаров',
	position: 'Директор',
	profileImageSrc: '/images/shared/profile.jpg',
}))

export default function AboutPage() {
	return (
		<main className='flex flex-col items-center justify-center'>
			<section className='relative w-full min-h-70 md:min-h-100 justify-center'>
				<div className='container mx-auto px-0 sm:px-10'>
					<div className='mt-20 md:mt-30 text-center'>
						<h1 className='text-black leading-[1.2] text-[24px] md:text-[40px] font-semibold'>
							Наша школа
						</h1>
						<h3 className='text-[20px] md:text-[30px] leading-[1.2] font-medium text-black mt-5'>
							Школа - не только место, где учат, но и где учатся жить
						</h3>
					</div>
				</div>
			</section>
			<section className='w-full'>
				<div className='w-full grid grid-cols-[1fr] md:justify-center md:grid-cols-[minmax(0,680px)_minmax(0,680px)]'>
					<div className='order-2 md:order-1'>
						<Image
							src='/images/about/image-1.png'
							width={720}
							height={450}
							alt='Image'
							className='w-full h-full max-h-130 object-cover'
						/>
					</div>
					<div className='w-full order-1 md:order-2 bg-[#00014D] py-10 px-10 md:py-17 md:px-17'>
						<div className='max-w-200 flex flex-col items-center 2xl:items-baseline gap-14'>
							<h4 className='text-white text-xl lg:text-3xl font-semibold'>
								Наш директор
							</h4>
							<p className='text-white text-center 2xl:text-start text-sm lg:text-xl'>
								Руководитель нашей школы – это человек, который
								вдохновляет и направляет. С его опытом и преданностью
								делу, мы уверены в успешном будущем наших учеников. Он
								всегда открыт для общения и готов поддержать каждого из
								вас в вашем образовательном пути. Присоединяйтесь к нам,
								и вместе мы достигнем новых высот!
							</p>
						</div>
					</div>
				</div>
				<div className='w-full grid grid-cols-[1fr] md:justify-center md:grid-cols-[minmax(0,680px)_minmax(0,680px)]'>
					<div className='w-full bg-[#00014D] py-10 px-10 md:py-17 md:px-17'>
						<div className='max-w-200 flex flex-col items-center 2xl:items-baseline gap-14'>
							<h4 className='text-white text-xl lg:text-3xl font-semibold'>
								Принципы и ценности
							</h4>
							<ul className='mx-auto list-disc text-white text-left text-sm lg:text-xl space-y-2 pl-5'>
								<li>Доброта</li>
								<li>Уважение</li>
								<li>Отвественность</li>
								<li>Стремление</li>
								<li>Веселье</li>
							</ul>
						</div>
					</div>
					<div className='w-full'>
						<Image
							src='/images/about/image-2.png'
							width={720}
							height={450}
							alt='Image'
							className='w-full h-full max-h-130 object-cover'
						/>
					</div>
				</div>
			</section>
			<section className='w-full py-17.5'>
				<div className='max-w-3xl mx-auto px-9 py-16 md:pt-32 text-center'>
					<h2 className='text-3xl md:text-[40px] font-semibold'>
						Администрация школы
					</h2>
					<p className='mt-7 text-sm  font-medium'>
						Администрация школы — это команда профессионалов, создающих
						безопасную и вдохновляющую образовательнуюу. Мы внедряем
						современные методы обучения, чтобы помочь каждому ученику
						раскрыть свои таланты. Наша цель — поддерживать связь с
						родителями и педагогами для эффективного образовательного
						процесса. Мы открыты к предложениям для улучшения нашей школы.
					</p>
				</div>
				<div className='max-w-384 mx-auto px-5 md:px-10'>
					<ul className='w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-4 gap-y-10 md:gap-y-30'>
						{adminMembers.map((member, i) => (
							<li
								key={`${member.name}-${i}`}
								className='flex justify-center'
							>
								<AdminMemberCard {...member} />
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	)
}
