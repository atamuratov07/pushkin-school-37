import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/shared/components/ui/card'
import { ImageFallback } from '@/shared/components/ui/image-fallback'
import { cn } from '@/shared/lib/utils'

type AdminMemberCardProps = {
	name: string
	position: string
	profileImageSrc?: string | null
	className?: string
}

export function AdminMemberCard({
	name,
	position,
	profileImageSrc,
	className,
}: AdminMemberCardProps) {
	return (
		<Card
			className={cn(
				'items-center gap-4 border-none rounded-[5px] bg-[#F6F6F6] p-2.5 pb-6 text-center md:p-3.5 md:pb-8 w-full min-w-75 max-w-80',
				className,
			)}
		>
			<CardContent className='flex w-full flex-col items-center'>
				<div className='relative mb-1 md:mb-2.5 h-80 w-full overflow-hidden rounded-[5px]'>
					<ImageFallback
						src={profileImageSrc}
						alt={name}
						fill
						className='object-cover'
						fallbackClassName='absolute inset-0'
					/>
				</div>
				<CardTitle className='text-base md:text-xl font-semibold'>
					{name}
				</CardTitle>
				<CardDescription className='mt-2 text-sm'>
					{position}
				</CardDescription>
			</CardContent>
		</Card>
	)
}
