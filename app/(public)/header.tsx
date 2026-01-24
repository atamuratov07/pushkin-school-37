'use client'

import Image from 'next/image'
import { useState } from 'react'
import MobileNav from './mobile-nav'
import Nav, { type NavItem } from './nav'

const navItems: NavItem[] = [
	{ label: 'Главная', href: '/' },
	{ label: 'О школе', href: '/about' },
	{ label: 'Новости', href: '/news' },
	{ label: 'Контакты', href: '/contacts' },
]

export default function Header() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<header className='border-b border-slate-200 bg-white'>
			<div className='mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6'>
				<div className='flex items-center gap-3'>
					<Image
						className='h-12 w-12'
						src='/logo.svg'
						alt='School logo'
						width={80}
						height={80}
						priority
					/>
					<div>
						<h3 className='text-base font-semibold text-slate-900'>Школа №37</h3>
						<span className='text-xs text-slate-500'>имени А.С. Пушкина</span>
					</div>
				</div>

				<Nav items={navItems} className='hidden sm:block' />

				<button
					className='inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 sm:hidden'
					onClick={() => setIsOpen((prev) => !prev)}
					type='button'
					aria-expanded={isOpen}
					aria-label='Открыть меню'
				>
					<span className='relative block h-3 w-4'>
						<span className='absolute left-0 top-0 h-0.5 w-4 rounded bg-current' />
						<span className='absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-current' />
						<span className='absolute left-0 bottom-0 h-0.5 w-4 rounded bg-current' />
					</span>
				</button>
			</div>
			<MobileNav
				items={navItems}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</header>
	)
}
