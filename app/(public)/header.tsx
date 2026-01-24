import Image from 'next/image'
import MobileNav from './mobile-nav'
import Nav, { type NavItem } from './nav'

const navItems: NavItem[] = [
	{ label: 'Главная', href: '/' },
	{ label: 'О нас', href: '/about' },
	{ label: 'Новости', href: '/news' },
	{ label: 'Учителя', href: '/teachers' },
	{ label: 'Ученики', href: '/students' },
	{ label: 'События', href: '/events' },
	{ label: 'Контакты', href: '/contacts' },
]

export default function Header() {
	return (
		<header className=''>
			<div className='mx-auto'>
				<div className='flex py-3 px-5 items-center justify-between sm:justify-center'>
					<div className='flex items-center gap-2'>
						<Image
							className='h-12 w-12'
							src='/logo.svg'
							alt='School logo'
							width={80}
							height={80}
							priority
						/>
						<div>
							<h3 className='text-base font-semibold text-slate-900'>
								Школа №37
							</h3>
							<span className='text-xs text-slate-500'>
								имени А.С. Пушкина
							</span>
						</div>
					</div>
					<MobileNav items={navItems} />
				</div>
				<div className='hidden sm:block'>
					<Nav items={navItems} />
				</div>
			</div>
		</header>
	)
}
