import Image, { type ImageProps } from 'next/image'

import { cn } from '@/shared/lib/utils'

type ImageFallbackProps = Omit<ImageProps, 'src'> & {
	src?: ImageProps['src'] | null
	fallbackClassName?: string
}

export function ImageFallback({
	src,
	fallbackClassName,
	alt,
	...props
}: ImageFallbackProps) {
	if (!src) {
		return (
			<div
				aria-hidden='true'
				className={cn('bg-slate-200', fallbackClassName)}
			/>
		)
	}

	return <Image src={src} alt={alt} {...props} />
}
