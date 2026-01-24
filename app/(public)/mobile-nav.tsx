import Link from 'next/link'
import type { NavItem } from './nav'

type MobileNavProps = {
	items: NavItem[]
	isOpen: boolean
	onClose: () => void
}

export default function MobileNav({ items, isOpen, onClose }: MobileNavProps) {
	if (!isOpen) {
		return null
	}

	return (
		<div className='sm:hidden'>
			<div
				className='fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm'
				onClick={onClose}
				aria-hidden='true'
			/>
			<div className='fixed right-4 top-20 z-50 w-[min(90vw,320px)] rounded-2xl bg-white p-6 shadow-xl'>
				<div className='flex items-center justify-between'>
					<p className='text-sm font-semibold text-slate-500'>Меню</p>
					<button
						onClick={onClose}
						className='rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500'
						type='button'
					>
						Закрыть
					</button>
				</div>
				<ul className='mt-4 flex flex-col gap-3'>
					{items.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className='block rounded-lg px-3 py-2 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900'
								onClick={onClose}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
