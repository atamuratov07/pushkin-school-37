import type { Locale } from '@/i18n/config'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from '@/shared/components/ui/card'
import { ImageFallback } from '@/shared/components/ui/image-fallback'
import { Separator } from '@/shared/components/ui/separator'
import { formatLocalizedDate } from '@/shared/lib/utils'

type NewsCardProps = {
	imageUrl?: string | null
	title: string
	description: string
	date: string | Date
	locale: Locale
}

export function NewsCard({
	imageUrl,
	title,
	description,
	date,
	locale,
}: NewsCardProps) {
	return (
		<Card className='grid h-full border-black bg-white md:grid-cols-[324px_1fr]'>
			<div className='relative min-h-90'>
				<ImageFallback
					src={imageUrl}
					alt={title}
					fill
					className='object-cover'
					fallbackClassName='absolute inset-0'
				/>
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
						{formatLocalizedDate(date, locale)}
					</time>
				</CardFooter>
			</div>
		</Card>
	)
}
