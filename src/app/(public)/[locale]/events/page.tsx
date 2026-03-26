import { EventCard } from './EventCard'

const events = [
	{
		title: 'Последний звонок',
		location: 'Школа №37 имени А.С.Пушкина',
		date: '2026-04-22',
	},
	{
		title: 'Последний звонок',
		location: 'Школа №37 имени А.С.Пушкина',
		date: '2026-04-18',
	},
	{
		title: 'Последний звонок',
		location: 'Школа №37 имени А.С.Пушкина',
		date: '2026-04-12',
	},
	{
		title: 'Последний звонок',
		location: 'Школа №37 имени А.С.Пушкина',
		date: '2026-04-05',
	},
]

export default function EventsPage() {
	return (
		<main className='flex flex-col items-center'>
			<section className='w-full px-5'>
				<div className='mx-auto my-17 px-10 text-center'>
					<h1 className='text-3xl md:text-[40px] font-bold leading-[1.2] text-black'>
						Школьные события
					</h1>
				</div>
			</section>
			<section className='w-full bg-[#00014D] pt-35 pb-20 flex justify-center'>
				<div className='container bg-white py-5 px-5 md:py-8 md:px-10 mx-10'>
					<ul className='divide-y divide-black border-y border-black'>
						{events.map((event, index) => (
							<li key={`${event.title}-${index}`}>
								<EventCard {...event} />
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	)
}
