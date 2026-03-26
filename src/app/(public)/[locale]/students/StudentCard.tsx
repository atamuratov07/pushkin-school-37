import Image from 'next/image'

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

type StudentStatus = 'enrolled' | 'graduated'

type StudentCardProps = {
	name: string
	photoUrl: string
	classLabel: string
	status: StudentStatus
	graduationYear?: number
	className?: string
}

export function StudentCard({
	name,
	photoUrl,
	classLabel,
	status,
	graduationYear,
	className,
}: StudentCardProps) {
	const statusLabel = status === 'enrolled' ? 'Текущий ученик' : 'Выпускник'

	return (
		<Card
			className={cn(
				'items-center gap-4 border-none rounded-[5px] bg-[#F6F6F6] p-2.5 pb-6 text-center md:p-3.5 md:pb-8 w-full min-w-75 max-w-80',
				className,
			)}
		>
			<CardContent className='flex w-full flex-col items-center'>
				<div className='relative mb-1 md:mb-2.5 h-80 w-full overflow-hidden rounded-[5px]'>
					<Image src={photoUrl} alt={name} fill className='object-cover' />
				</div>
				<CardTitle className='text-base md:text-xl font-semibold'>
					{name}
				</CardTitle>
				<CardDescription className='mt-2 text-sm'>
					{`Класс ${classLabel}`}
				</CardDescription>
				<p className='mt-1 text-xs uppercase tracking-[0.16em] text-black/55'>
					{statusLabel}
				</p>
				{graduationYear ? (
					<p className='mt-1 text-sm text-black/65'>{`Выпуск ${graduationYear}`}</p>
				) : null}
			</CardContent>
		</Card>
	)
}
