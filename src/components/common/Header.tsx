import { Department } from '@/types'
import SearchInput from '../ui/SearchInput'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/Select'

import Link from 'next/link'
import { Users } from 'lucide-react'

const Header = () => {
	return (
		<header className='bg-white shadow-sm'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
					<Link
						href='/team'
						className='flex items-center space-x-2 text-xl font-bold text-primary'
					>
						<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
							<Users className='h-5 w-5' />
						</div>
						<span className='hidden sm:block'>Team Dashboard</span>
					</Link>
					<div className='flex flex-col sm:flex-row gap-4'>
						<SearchInput />
						<Select>
							<SelectTrigger className='w-[200px]'>
								<SelectValue placeholder='Виберіть департамент' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='all'>Усі департаменти</SelectItem>
									<SelectItem value={Department.SALES}>Продажі</SelectItem>
									<SelectItem value={Department.FINANCE}>Фінанси</SelectItem>
									<SelectItem value={Department.IT}>Технічний</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
