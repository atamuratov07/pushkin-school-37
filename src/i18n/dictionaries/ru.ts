export const ru = {
	header: {
		home: 'Главная',
		about: 'О нас',
	},
	events: {
		detailsButton: 'Подробнее',
	},
	form: {
		fieldLabels: {
			message: 'Ваше сообщение',
			name: 'Имя и фамилия',
			phone: 'Номер телефона',
		},
		fieldPlaceholders: {
			message: 'Расскажите, чем мы можем помочь',
			name: 'Иван Иванов',
			phone: '+998 90 123 45 67',
		},
		honeypotLabel: 'Оставьте это поле пустым',
		rateLimited: 'Слишком много попыток. Попробуйте позже.',
		submitError: 'Не удалось отправить форму. Попробуйте еще раз.',
		submitSuccess: 'Спасибо. Мы свяжемся с вами в ближайшее время.',
		validation: {
			messageMin: 'Сообщение должно содержать минимум 10 символов',
			nameMin: 'Имя должно содержать минимум 2 символа',
			phoneInvalid: 'Неверный формат номера телефона',
			phoneMin: 'Номер телефона должен содержать минимум 10 цифр',
			phoneRequired: 'Номер телефона обязателен',
		},
	},
} as const
