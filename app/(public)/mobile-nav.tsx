'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { NavItem } from './nav'

export default function MobileNav({ items }: { items: NavItem[] }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className=''>
			<div className='sm:hidden'>
				<button
					// className='relative z-50 inline-flex items-center justify-center p-2 text-foreground transition'
					className={`relative z-50 w-8 h-8 flex justify-around flex-col flex-wrap cursor-pointer`}
					onClick={() => setIsOpen(prev => !prev)}
					type='button'
					aria-expanded={isOpen}
					aria-label='Открыть меню'
				>
					<div
						className={`bg-foreground block w-8 h-[3px] rounded transition-all origin-[1px] ${
							isOpen ? 'rotate-45' : 'rotate-0'
						}`}
					/>
					<div
						className={`bg-foreground block w-8 h-[3px] rounded transition-all origin-[1px] ${
							isOpen ? 'bg-transparent' : 'translate-x-0'
						}`}
					/>
					<div
						className={`bg-foreground block w-8 h-[3px] rounded transition-all origin-[1px] ${
							isOpen ? '-rotate-45' : 'rotate-0'
						}`}
					/>
				</button>

				{isOpen && (
					<div className=''>
						<div
							className='fixed inset-0 z-10 bg-slate-900/40 backdrop-blur-sm'
							onClick={() => setIsOpen(false)}
							aria-hidden='true'
						/>
						<div className='fixed z-40 top-0 left-0 w-full bg-background p-6 shadow-xl'>
							<ul className='mt-4 flex flex-col items-center gap-3'>
								{items.map(item => (
									<li
										key={item.href}
										className='w-full hover:bg-slate-50 p-3 round-lg transition hover:text-slate-900 cursor-pointer font-medium'
									>
										<Link
											href={item.href}
											className=''
											onClick={() => setIsOpen(false)}
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
