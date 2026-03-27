'use client'

import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { Button } from '@/shared/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'

import {
	submitContactFormAction,
	type ContactFormActionResult,
} from './actions'
import { createContactFormSchema, type ContactFormValues } from './schema'

type ContactFormProps = {
	description?: string
	locale: Locale
	submitLabel?: string
	title?: string
}

type ContactFormClientValues = ContactFormValues & {
	website?: string
}

export function ContactForm({
	description,
	locale,
	submitLabel,
	title,
}: ContactFormProps) {
	const dictionary = getDictionary(locale).form
	const formSchema = createContactFormSchema(dictionary.validation)
	const clientFormSchema = formSchema.extend({
		website: z.string().optional().default(''),
	})
	const [submissionResult, setSubmissionResult] =
		useState<ContactFormActionResult | null>(null)
	const [isPending, startTransition] = useTransition()

	const form = useForm<ContactFormClientValues>({
		defaultValues: {
			message: '',
			name: '',
			phone: '',
			website: '',
		},
		resolver: zodResolver(clientFormSchema),
	})

	const fieldLabels = dictionary.fieldLabels
	const fieldPlaceholders = dictionary.fieldPlaceholders
	const resolvedTitle = title ?? ''
	const resolvedDescription = description ?? ''
	const resolvedSubmitLabel = submitLabel ?? 'Submit'

	const onSubmit = form.handleSubmit(data => {
		setSubmissionResult(null)
		form.clearErrors()

		startTransition(async () => {
			const result = await submitContactFormAction({
				locale,
				message: data.message,
				name: data.name,
				phone: data.phone,
				website: data.website,
			})

			for (const [fieldName, messages] of Object.entries(
				result.fieldErrors ?? {},
			)) {
				if (!messages?.length) {
					continue
				}

				form.setError(fieldName as keyof ContactFormValues, {
					message: messages[0],
					type: 'server',
				})
			}

			setSubmissionResult(result)

			if (result.status === 'success') {
				form.reset()
			}
		})
	})

	const statusClassName =
		submissionResult?.status === 'success' ? 'text-green-200' : 'text-red-200'

	const buttonText = isPending ? '...' : resolvedSubmitLabel

	return (
		<div className='w-full max-w-175 p-5 flex flex-col gap-7.5 md:gap-10'>
			<div>
				<h3 className='text-white font-bold text-xl md:text-3xl text-center'>
					{resolvedTitle}
				</h3>
				<p className='text-white text-sm md:text-base text-center mt-3'>
					{resolvedDescription}
				</p>
			</div>
			<form id='contact-form' onSubmit={onSubmit}>
				<FieldGroup className='flex flex-col gap-6 text-white'>
					<Controller
						name='website'
						control={form.control}
						render={({ field }) => (
							<div
								aria-hidden='true'
								className='absolute -left-2500 top-auto h-px w-px overflow-hidden opacity-0'
							>
								<FieldLabel htmlFor='contact-form-website'>
									{dictionary.honeypotLabel}
								</FieldLabel>
								<Input
									{...field}
									id='contact-form-website'
									autoComplete='off'
									tabIndex={-1}
									type='text'
								/>
							</div>
						)}
					/>

					<Controller
						name='name'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor='contact-form-name'
									className='font-normal'
								>
									{fieldLabels.name}
								</FieldLabel>
								<Input
									{...field}
									id='contact-form-name'
									aria-invalid={fieldState.invalid}
									autoComplete='name'
									disabled={isPending}
									placeholder={fieldPlaceholders.name}
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
									{fieldLabels.phone}
								</FieldLabel>
								<Input
									{...field}
									id='contact-form-phone'
									aria-invalid={fieldState.invalid}
									autoComplete='tel'
									disabled={isPending}
									placeholder={fieldPlaceholders.phone}
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
									{fieldLabels.message}
								</FieldLabel>
								<Textarea
									{...field}
									id='contact-form-message'
									aria-invalid={fieldState.invalid}
									autoComplete='off'
									disabled={isPending}
									placeholder={fieldPlaceholders.message}
									rows={5}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{submissionResult?.message && (
						<FieldError className={statusClassName}>
							{submissionResult.message}
						</FieldError>
					)}

					<Field>
						<Button
							type='submit'
							disabled={isPending}
							className='w-full rounded-none h-10 bg-black text-white text-base font-normal cursor-pointer'
						>
							{buttonText}
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</div>
	)
}
