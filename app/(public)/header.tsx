import Image from 'next/image'

export default function Header() {
	return (
		<header className=''>
			<div className='flex py-3 px-5 justify-between sm:justify-center'>
				<div className='flex items-center gap-2'>
					<Image
						className=''
						src='/logo.svg'
						alt='School logo'
						width={80}
						height={80}
						priority
					/>
					<div className=''>
						<h3>Школа №37</h3>
						<span>имени А.С.Пушкина</span>
					</div>
				</div>
				<div>
					<button>Burger Button</button>
					<nav>Mobile Nav</nav>
				</div>
			</div>
			<div className=''>
				<nav className=''>
					<ul className=''>
						<li>Главная</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
