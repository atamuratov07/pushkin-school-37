import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { getBackgroundImage } from '@/shared/lib/utils'
import { Form } from '@/widgets/form/form'
import Image, { getImageProps } from 'next/image'

const events = [
	{
		title: 'Обсуждение школьных мероприятий: присоединяйтесь к общению',
		date: '14 Апреля',
	},
	{
		title: 'Обсуждение школьных мероприятий: присоединяйтесь к общению',
		date: '14 Апреля',
	},
	{
		title: 'Обсуждение школьных мероприятий: присоединяйтесь к общению',
		date: '14 Апреля',
	},
]

export default function Home() {
	const {
		props: { srcSet },
	} = getImageProps({
		alt: 'Main Background Image',
		width: 128,
		height: 128,
		src: '/images/bg-image-1.png',
	})
	const backgroundImage = getBackgroundImage(srcSet)
	const style = { backgroundImage }
	return (
		<main className='flex flex-col items-center justify-center'>
			<section
				style={style}
				className='relative w-full h-[80vh] min-h-150 max-h-182.5 justify-center bg-cover bg-center bg-no-repeat'
			>
				<div className='container mx-auto px-0 sm:px-10'>
					<div className='w-full max-w-180 bg-[#0003A7C9] py-15 px-10 sm:mt-25 flex flex-col gap-7.5 items-center sm:items-start sm:rounded-sm'>
						<h1 className='text-white text-center sm:text-left leading-[1.2] text-[24px] md:text-[40px] font-bold'>
							Школа - не только место, где учат, но и где учатся жить!
						</h1>
						<h3 className='text-[20px] md:text-[30px] leading-[1.2] font-medium text-white'>
							Школа No37 города Нукус.
						</h3>
						<Button className='bg-black p-3.75 md:py-6.5 md:px-9 text-base md:text-lg h-auto rounded-sm'>
							Познакомиться с школой
						</Button>
					</div>
				</div>
			</section>
			<section className='w-full'>
				<div className='w-full grid grid-cols-[1fr] md:grid-cols-[1fr_1fr]'>
					<div className='w-full order-2 md:order-1'>
						<Image
							src='/images/image-2.png'
							width={720}
							height={450}
							alt='Image'
							className='w-full h-full max-h-112.5 object-cover'
						/>
					</div>
					<div className='w-full order-1 md:order-2 bg-[#00014D] py-10 px-10 md:py-12.5'>
						<div className='max-w-200 flex flex-col items-center 2xl:items-baseline gap-10'>
							<h4 className='text-white text-xl lg:text-3xl font-semibold'>
								О нас
							</h4>
							<p className='text-white text-center 2xl:text-start text-sm lg:text-xl'>
								Мы - государственная школа, которая стремится обеспечить
								качественное образование для каждого ученика. Наша
								миссия - развивать навыки и способности детей, создавая
								безопасную и поддерживающую атмосферу для их обучения и
								роста.
							</p>
							<Button className='bg-[#484BFF] text-white text-medium text-sm md:text-lg py-4 px-11 md:py-5 md:px-7 rounded-sm'>
								Узнать побольше
							</Button>
						</div>
					</div>
				</div>
				<div className='w-full grid grid-cols-[1fr] md:grid-cols-[1fr_1fr]'>
					<div className='w-full bg-[#00014D] py-10 px-10 md:py-12.5 flex justify-end'>
						<div className='max-w-200 flex flex-col items-center 2xl:items-end gap-10'>
							<h4 className='text-white text-xl lg:text-3xl font-semibold'>
								Жизнь учеников в школе
							</h4>
							<p className='text-white text-center 2xl:text-end text-sm lg:text-xl'>
								В нашей государственной школе жизнь наполнена
								увлекательными событиями и возможностями для личностного
								роста. Учащиеся активно участвуют в различных
								мероприятиях, которые способствуют развитию их талантов
								и дружеских связей
							</p>
							<Button className='bg-[#484BFF] text-white text-medium text-sm md:text-lg py-4 px-11 md:py-5 md:px-7 rounded-sm'>
								Узнать побольше
							</Button>
						</div>
					</div>
					<div className='w-full'>
						<Image
							src='/images/image-1.png'
							width={720}
							height={450}
							alt='Image'
							className='w-full h-full max-h-112.5 object-cover'
						/>
					</div>
				</div>
			</section>
			<section className='w-full'>
				<div className='container mx-auto pt-28 pb-9 sm:pb-16 md:pt-25 md:pb-22.5'>
					<h2 className='text-3xl md:text-[40px] font-bold text-center'>
						Последние новости
					</h2>
				</div>
				<div className='container mx-auto flex flex-col items-center'>
					<ul className='w-full grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5'>
						{events.map((event, i) => {
							const {
								props: { srcSet },
							} = getImageProps({
								alt: 'News Card Background Image',
								width: 200,
								height: 200,
								src: '/images/image-3.png',
							})
							const backgroundImage = getBackgroundImage(srcSet)
							const style = {
								backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), ${backgroundImage}`,
							}
							return (
								<li key={i}>
									<div
										style={style}
										className='flex flex-col gap-5 md:gap-15 max-w-screen p-6 pb-20 bg-cover bg-center bg-no-repeat text-white'
									>
										<span className='text-sm'>{event.date}</span>
										<h3 className='font-medium text-xl md:text-3xl'>
											{event.title}
										</h3>
										<Separator />
									</div>
								</li>
							)
						})}
					</ul>
					<Button className='bg-black p-3.75 mt-7.5 md:mt-17.5 md:py-6.5 md:px-9 text-base md:text-lg h-auto rounded-sm'>
						Жизнь наших учеников
					</Button>
				</div>
			</section>
			<section className='w-full'>
				<div className='text-center pt-32 pb-4 md:py-23 px-10'>
					<p className='font-bold text-xl md:text-3xl text-black'>
						Подпишитесь на наш{' '}
						<a
							href='https://www.instagram.com/37shkola.nukus/'
							target='_blank'
							className='text-[#007CC9] underline hover:underline-offset-6'
						>
							инстаграм
						</a>{' '}
						чтобы быть в курсе Событий
					</p>
				</div>
			</section>
			<section className='w-full py-5 md:py-20 bg-[#1D519A] flex justify-center'>
				<Form />
			</section>
		</main>
	)
}
