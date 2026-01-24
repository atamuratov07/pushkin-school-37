import Link from 'next/link'

export type NavItem = {
	label: string
	href: string
}

type NavProps = {
	items: NavItem[]
	className?: string
}

export default function Nav({ items, className }: NavProps) {
	return (
		<nav className={className} aria-label='Primary'>
			<ul className='flex flex-col gap-4 sm:flex-row sm:items-center'>
				{items.map((item) => (
					<li key={item.href}>
						<Link
							href={item.href}
							className='text-sm font-medium text-slate-700 transition hover:text-slate-900'
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
