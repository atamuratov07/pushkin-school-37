import Link from 'next/link'

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
	return (
		<div className='bg-secondary-background w-full px-5 flex justify-center'>
			<nav className={`${className} py-4`} aria-label='Primary'>
				<ul className='flex gap-11 flex-row items-center'>
					{items.map(item => (
						<li key={item.href}>
							<Link
								href={item.href}
								className='text-secondary-foreground font-semibold'
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
