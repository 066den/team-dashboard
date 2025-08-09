import Link from 'next/link'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { TeamMember } from '@/types'
import { getAvatarColor, getFirstLetters } from '@/lib/utils'

const MemberCardRow = ({ name, role, status, department, id }: TeamMember) => {
	const firstLetters = getFirstLetters(name)
	const bgColor = getAvatarColor(name)
	return (
		<Link href={`/team/${id}`}>
			<div className='bg-white border border-grey-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 cursor-pointer'>
				<div className='flex items-center gap-4'>
					<Avatar className='size-12 text-white text-xl'>
						<AvatarFallback className={bgColor}>{firstLetters}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className='font-semibold text-lg text-gray-900'>{name}</h3>
						<p className='text-sm text-gray-600'>{role}</p>
					</div>
				</div>
				<div className='flex justify-between items-center mt-2'>
					<span
						className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
							status === 'active'
								? 'bg-green-100 text-green-800'
								: 'bg-red-100 text-red-800'
						}`}
					>
						{status === 'active' ? 'Активний' : 'Неактивний'}
					</span>
					<span className='text-sm text-indigo-600 font-medium'>
						{department}
					</span>
				</div>
			</div>
		</Link>
	)
}

export default MemberCardRow
