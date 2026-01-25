'use client'

import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import type { NavItem } from './nav'

export default function MobileNav({ items }: { items: NavItem[] }) {
	return (
		<Sheet>
			<SheetTrigger asChild className='sm:hidden'>
				<Button size={'icon'} variant={'ghost'}>
					<MenuIcon className='' size={32} />
				</Button>
			</SheetTrigger>
			<SheetContent side='top' className='max-h-50vh'>
				<SheetHeader>
					<SheetTitle>Меню</SheetTitle>
				</SheetHeader>
				<nav className='pb-8'>
					<ul className='flex flex-col gap-3 px-2'>
						{items.map(item => (
							<li className='' key={item.href}>
								<SheetClose asChild>
									<Link
										href={item.href}
										className='block w-full p-2 rounded font-medium hover:bg-accent'
									>
										{item.label}
									</Link>
								</SheetClose>
							</li>
						))}
					</ul>
				</nav>
			</SheetContent>
		</Sheet>
	)
}
