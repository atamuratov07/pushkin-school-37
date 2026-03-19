import { NewsCard } from './NewsCard'

const news = [
	{
		imageUrl: '/images/home/image-3.png',
		title: 'Обсуждение школьных мероприятии: Присоединяйтесь к общению!',
		description:
			'Добро пожаловать на сайт школы № 37 имени А.С.Пушкина в городе Нукус! Мы рады представить новую функцию нашего сайта - блог, который...',
		date: '2026-04-14',
	},
	{
		imageUrl: '/images/home/image-3.png',
		title: 'Обсуждение школьных мероприятии: Присоединяйтесь к общению!',
		description:
			'Добро пожаловать на сайт школы № 37 имени А.С.Пушкина в городе Нукус! Мы рады представить новую функцию нашего сайта - блог, который...',
		date: '2026-04-10',
	},
	{
		imageUrl: '/images/home/image-3.png',
		title: 'Обсуждение школьных мероприятии: Присоединяйтесь к общению!',
		description:
			'Добро пожаловать на сайт школы № 37 имени А.С.Пушкина в городе Нукус! Мы рады представить новую функцию нашего сайта - блог, который...',
		date: '2026-04-03',
	},
	{
		imageUrl: '/images/home/image-3.png',
		title: 'Обсуждение школьных мероприятии: Присоединяйтесь к общению!',
		description:
			'Добро пожаловать на сайт школы № 37 имени А.С.Пушкина в городе Нукус! Мы рады представить новую функцию нашего сайта - блог, который...',
		date: '2026-03-28',
	},
]

export default function NewsPage() {
	return (
		<main className='flex flex-col items-center'>
			<section className='w-full'>
				<div className='container mx-auto px-5 py-15 text-center md:py-12'>
					<h1 className='text-[24px] font-bold leading-[1.2] text-black md:text-[40px]'>
						Последние новости
					</h1>
				</div>
			</section>
			<section className='relative w-full pt-28'>
				<div className='absolute -z-1 inset-0 max-h-[110vh] bg-[#00014D]'></div>
				<div className='md:px-5 mx-auto'>
					<ul className='flex flex-col md:gap-12  max-w-210 mx-auto'>
						{news.map((item, index) => (
							<li key={`${item.title}-${index}`}>
								<NewsCard {...item} />
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	)
}
