import Link from 'next/link'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { TeamMember } from '@/types'
import { cn, getAvatarColor, getFirstLetters } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Mail, Phone, MessageCircle, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type MemberCardProps = {
	index: number
	member: TeamMember
}

const MemberCardGrid = ({ index, member }: MemberCardProps) => {
	const { name, role, status, department, id } = member

	const firstLetters = getFirstLetters(name)
	const bgColor = getAvatarColor(name)
	return (
		<Link href={`/team/${id}`}>
			<Card
				className={cn(
					'card-hover cursor-pointer transition-all duration-200 group',
					'hover:shadow-lg ',
					'slide-up'
				)}
				style={{
					animationDelay: `${index * 25}ms`,
					animationFillMode: 'both',
				}}
			>
				<CardContent className='px-6'>
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
				</CardContent>
				<CardFooter className='flex justify-between items-center'>
					<Badge variant={status === 'active' ? 'secondary' : 'outline'}>
						{status === 'active' ? 'Активний' : 'Неактивний'}
					</Badge>
					<span className='text-sm text-indigo-600 font-medium'>
						{department}
					</span>
				</CardFooter>
			</Card>
		</Link>
	)
}

export default MemberCardGrid
