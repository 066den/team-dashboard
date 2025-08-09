import Link from 'next/link'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { TeamMember } from '@/types'
import { cn, getAvatarColor, getFirstLetters } from '@/lib/utils'
import { Card, CardContent } from '../ui/card'

type MemberCardRowProps = {
	index: number
	member: TeamMember
}

const MemberCardRow = ({ index, member }: MemberCardRowProps) => {
	const { name, role, status, department, id } = member
	const firstLetters = getFirstLetters(name)
	const bgColor = getAvatarColor(name)
	return (
		<Link href={`/team/${id}`}>
			<Card
				className={cn(
					'card-hover cursor-pointer transition-all duration-200 group py-4',
					'hover:shadow-lg ',
					'slide-up'
				)}
				style={{
					animationDelay: `${index * 25}ms`,
					animationFillMode: 'both',
				}}
			>
				<CardContent className='px-6 flex justify-between items-center'>
					<div className='flex items-center gap-4'>
						<Avatar className='size-12 text-white text-xl'>
							<AvatarFallback className={bgColor}>
								{firstLetters}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className='font-semibold text-lg text-gray-900'>{name}</h3>
							<p className='text-sm text-gray-600'>{role}</p>
						</div>
					</div>
					<div className='flex flex-col items-end justify-between gap-4'>
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
				</CardContent>
			</Card>
		</Link>
	)
}

export default MemberCardRow
