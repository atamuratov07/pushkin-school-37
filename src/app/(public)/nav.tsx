'use client'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/shared/components/ui/navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type NavItem = {
	label: string
	href: string
}

export default function Nav({
	items,
	className,
}: {
	items: NavItem[]
	className?: string
}) {
	const pathname = usePathname()
	return (
		<div className='bg-secondary-background w-full px-5 flex justify-center'>
			<NavigationMenu>
				<NavigationMenuList>
					{items.map(item => {
						const isActive = item.href === pathname
						return (
							<NavigationMenuItem key={item.href}>
								<NavigationMenuLink
									asChild
									active={isActive}
									className='text-background'
								>
									<Link href={item.href}>{item.label}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						)
					})}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
