import Image from 'next/image'

const NAV_ITEMS = [
	{
		title: 'О нас',
		href: '/about',
	},
	{
		title: 'Новости',
		href: '/news',
	},
	{
		title: 'События',
		href: '/events',
	},
	{
		title: 'Учителя',
		href: '/teachers',
	},
	{
		title: 'Ученики',
		href: '/students',
	},
	{
		title: 'Родителям',
		href: '/parents',
	},
	{
		title: 'Контакты',
		href: '/contacts',
	},
]

const SOCIAL_LINKS = [
	{
		title: 'Instagram',
		href: '#',
	},
	{
		title: 'Facebook',
		href: '#',
	},
]

export function Footer() {
	return (
		<div className='w-full px-10 pt-18 pb-25 bg-[#1D519A] mt-30 md:mt-40'>
			<div className='container mx-auto'>
				<div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
					<div className='flex flex-row flex-nowrap items-center gap-2.5'>
						<Image
							src='/icons/logo-white.svg'
							width={80}
							height={80}
							alt='Logo'
						/>
						<div className='text-white flex flex-col justify-baseline'>
							<span className='font-semibold text-xl'>Школа №37</span>
							<span className='font-normal text-sm'>
								имени А.С.Пушкина
							</span>
						</div>
					</div>
					<ul className='flex flex-col items-center md:items-start md:flex-row gap-12 text-center md:text-start'>
						<li className=''>
							<span className='text-[#9AD8FF] text-lg font-semibold'>
								Быстрая навигация
							</span>
							<ul className='mt-5 text-white w-full grid grid-cols-2 gap-x-5 gap-y-4'>
								{NAV_ITEMS.map(item => (
									<li key={item.title}>
										<a href={item.href} className='hover:underline'>
											{item.title}
										</a>
									</li>
								))}
							</ul>
						</li>
						<li className=''>
							<span className='text-[#9AD8FF] text-lg font-semibold'>
								Будьте на связи
							</span>
							<ul className='mt-5 w-full text-white font-medium flex flex-col gap-5'>
								{SOCIAL_LINKS.map(link => (
									<li key={link.title}>
										<a href={link.href} className='hover:underline'>
											{link.title}
										</a>
									</li>
								))}
							</ul>
						</li>
						<li>
							<span className='text-[#9AD8FF] text-lg font-semibold'>
								Наш адрес
							</span>
							<p className='mt-5 text-white font-medium'>
								г. Москва, ул. Пушкина, д. 37
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
