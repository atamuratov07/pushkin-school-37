'use client'
import { Button } from '@/shared/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	phone: z
		.string()
		.min(1, 'Phone number is required')
		.regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
		.min(10, 'Phone number must be at least 10 digits'),
	message: z.string().min(10, 'Message must be at least 10 characters'),
})

export function Form() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			phone: '',
			message: '',
		},
	})
	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data)
	}
	return (
		<div className='w-full max-w-175 p-5 flex flex-col gap-7.5 md:gap-10'>
			<div className=''>
				<h3 className='text-white font-bold text-xl md:text-3xl text-center'>
					Свяжитесь с нами!
				</h3>
				<p className='text-white text-sm md:text-base text-center mt-3'>
					Заполните анкету чтобы мы могли выйти на обратный связь
				</p>
			</div>
			<form id='contact-form' onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup className='flex flex-col gap-6 text-white'>
					<Controller
						name='name'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor='contact-form-name'
									className='font-normal'
								>
									Имя Фамилия
								</FieldLabel>
								<Input
									{...field}
									id='contact-form-name'
									aria-invalid={fieldState.invalid}
									autoComplete='off'
									className=''
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name='phone'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor='contact-form-phone'
									className='font-normal'
								>
									Номер телефона
								</FieldLabel>
								<Input
									{...field}
									id='contact-form-phone'
									aria-invalid={fieldState.invalid}
									autoComplete='off'
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name='message'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor='contact-form-message'
									className='font-normal'
								>
									Ваше сообщение
								</FieldLabel>
								<Input
									{...field}
									id='contact-form-message'
									aria-invalid={fieldState.invalid}
									autoComplete='off'
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Field>
						<Button
							type='submit'
							className='w-full rounded-none h-10 bg-black text-white text-base font-normal cursor-pointer'
						>
							Отправить
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</div>
	)
}
