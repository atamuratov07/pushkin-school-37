import Image from 'next/image'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'

type NewsCardProps = {
	imageUrl: string
	title: string
	description: string
	date: string | Date
}

function formatNewsDate(date: string | Date) {
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

export function NewsCard({
	imageUrl,
	title,
	description,
	date,
}: NewsCardProps) {
	return (
		<Card className='grid h-full border-black bg-white md:grid-cols-[324px_1fr]'>
			<div className='relative min-h-90'>
				<Image src={imageUrl} alt={title} fill className='object-cover' />
			</div>
			<div className='flex min-h-full flex-col'>
				<CardContent className='flex flex-1 flex-col gap-4 md:gap-2.5 px-4 py-5 md:py-6'>
					<CardTitle className='text-2xl md:text-3xl font-semibold'>
						{title}
					</CardTitle>
					<CardDescription className='text-lg font-medium leading-6 text-black/75 md:text-xl'>
						{description}
					</CardDescription>
				</CardContent>
				<CardFooter className='mt-auto block px-5 pb-4 md:px-8 md:pb-6'>
					<Separator className='mb-3 bg-[#B7B7B7]' />
					<time className='block text-sm text-black/70'>
						{formatNewsDate(date)}
					</time>
				</CardFooter>
			</div>
		</Card>
	)
}
