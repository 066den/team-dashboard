import Link from 'next/link'
import { Users } from 'lucide-react'

const Header = () => {
	return (
		<header className='bg-white shadow-sm sticky top-0 z-50'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
					<Link
						href='/'
						className='flex items-center space-x-2 text-xl font-bold text-primary'
					>
						<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
							<Users className='h-5 w-5' />
						</div>
						<span className='hidden sm:block'>Team Dashboard</span>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
