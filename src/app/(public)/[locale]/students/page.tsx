import { Button } from '@/shared/components/ui/button'
import { StudentCard } from './StudentCard'

type StudentStatus = 'enrolled' | 'graduated'

type Student = {
	name: string
	photoUrl: string
	classLabel: string
	status: StudentStatus
	graduationYear?: number
}

const teacherPlaceholder = {
	name: 'Миртурды Досназаров',
	photoUrl: '/images/shared/profile.jpg',
}

const students: Student[] = [
	{
		...teacherPlaceholder,
		classLabel: '5-А',
		status: 'enrolled',
	},
	{
		...teacherPlaceholder,
		classLabel: '5-Б',
		status: 'enrolled',
	},
	{
		...teacherPlaceholder,
		classLabel: '6-А',
		status: 'enrolled',
	},
	{
		...teacherPlaceholder,
		classLabel: '7-Б',
		status: 'enrolled',
	},
	{
		...teacherPlaceholder,
		classLabel: '8-А',
		status: 'enrolled',
	},
	{
		...teacherPlaceholder,
		classLabel: '9-Б',
		status: 'enrolled',
	},
	{
		...teacherPlaceholder,
		classLabel: '10-А',
		status: 'enrolled',
	},
	{
		...teacherPlaceholder,
		classLabel: '11-Б',
		status: 'enrolled',
	},
	{
		...teacherPlaceholder,
		classLabel: '11-А',
		status: 'graduated',
		graduationYear: 2025,
	},
	{
		...teacherPlaceholder,
		classLabel: '11-Б',
		status: 'graduated',
		graduationYear: 2024,
	},
	{
		...teacherPlaceholder,
		classLabel: '11-А',
		status: 'graduated',
		graduationYear: 2023,
	},
	{
		...teacherPlaceholder,
		classLabel: '11-Б',
		status: 'graduated',
		graduationYear: 2022,
	},
	{
		...teacherPlaceholder,
		classLabel: '11-А',
		status: 'graduated',
		graduationYear: 2021,
	},
	{
		...teacherPlaceholder,
		classLabel: '11-Б',
		status: 'graduated',
		graduationYear: 2020,
	},
	{
		...teacherPlaceholder,
		classLabel: '11-А',
		status: 'graduated',
		graduationYear: 2019,
	},
	{
		...teacherPlaceholder,
		classLabel: '11-Б',
		status: 'graduated',
		graduationYear: 2018,
	},
]

const enrolledStudents = students.filter(
	student => student.status === 'enrolled',
)
const graduatedStudents = students.filter(
	student => student.status === 'graduated',
)

export default function StudentsPage() {
	return (
		<main className='flex flex-col items-center'>
			<section className='w-full px-5'>
				<div className='mx-auto mt-7 mb-20 px-10 text-center md:my-25'>
					<h1 className='text-2xl md:text-[40px] font-bold leading-[1.2] text-black'>
						Наши Ученики
					</h1>
					<h3 className='mt-1 inline-block text-base md:text-2xl leading-[1.2] font-medium text-black'>
						Ученики и выпускники нашей школы
					</h3>
					<div className='flex items-center justify-center gap-5 mt-12'>
						<Button
							variant='outline'
							className='font-medium h-auto rounded-full text-[#1D519A] border-[#1D519A] border-2 py-2.5 px-5 text-base md:text-sm md:py-3 md:px-9 hover:text-white hover:bg-[#1D519A] data-[state=active]:bg-[#1D519A] transition-colors cursor-pointer'
						>
							Ученики
						</Button>
						<Button
							variant='outline'
							className='font-medium h-auto rounded-full text-[#1D519A] border-[#1D519A] border-2 py-2.5 px-5 text-base md:text-sm md:py-3 md:px-9 hover:text-white hover:bg-[#1D519A] data-[state=active]:bg-[#1D519A] transition-colors cursor-pointer'
						>
							Выпускники
						</Button>
					</div>
				</div>
			</section>
			<section className='relative w-full pb-18'>
				<div className='max-w-384 mx-auto px-5 md:px-10'>
					<div>
						<h2 className='mb-8 text-center text-2xl font-semibold md:mb-20 md:text-3xl'>
							Ученики
						</h2>
						<div className='py-5 md:py-18'>
							<ul className='grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-4 gap-y-10 md:gap-y-30'>
								{enrolledStudents.map((student, i) => (
									<li
										key={`enrolled-${student.name}-${student.classLabel}-${i}`}
										className='flex justify-center'
									>
										<StudentCard {...student} />
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className='mt-20'>
						<h2 className='mb-8 text-center text-2xl font-semibold md:mb-20 md:text-3xl'>
							Выпускники
						</h2>
						<div className='py-5 md:py-18'>
							<ul className='grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-4 gap-y-10 md:gap-y-30'>
								{graduatedStudents.map((student, i) => (
									<li
										key={`graduated-${student.name}-${student.graduationYear}-${i}`}
										className='flex justify-center'
									>
										<StudentCard {...student} />
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
