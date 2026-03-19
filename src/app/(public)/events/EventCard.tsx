import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/shared/components/ui/card'

type EventCardProps = {
	title: string
	location: string
	date: string | Date
}

function formatEventDate(date: string | Date) {
	const parsedDate = date instanceof Date ? date : new Date(date)

	if (Number.isNaN(parsedDate.getTime())) {
		return typeof date === 'string' ? date : ''
	}

	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(parsedDate)
}

export function EventCard({ title, location, date }: EventCardProps) {
	return (
		<Card className='border-none bg-white'>
			<CardContent className='flex items-center justify-between gap-x-6 gap-y-14 py-10 flex-col sm:flex-row md:py-14'>
				<div className='flex min-w-0 flex-col items-center sm:items-start gap-2'>
					<time className='text-sm text-black/60'>
						{formatEventDate(date)}
					</time>
					<CardTitle className='text-xl font-semibold text-[#1D519A] md:text-3xl'>
						{title}/
					</CardTitle>
					<CardDescription className='text-base font-medium text-black md:text-xl'>
						{location}
					</CardDescription>
				</div>
				<Button
					variant='outline'
					className='h-auto shrink-0 rounded-full border-[#1D519A] bg-transparent px-6 py-3 text-[#1D519A] hover:bg-[#1D519A] hover:text-white cursor-pointer border-2'
				>
					Больше
				</Button>
			</CardContent>
		</Card>
	)
}
