'use client'
import { TeamMember } from '@/types'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { getAvatarColor, getFirstLetters } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { Building2, Mail } from 'lucide-react'
import { useState } from 'react'
import MemberTabs from './MemberTabs'

type MemberProfileProps = {
	memberId: string
	initialMember: TeamMember
}

const MemberProfile = ({ initialMember }: MemberProfileProps) => {
	const [member, setMember] = useState<TeamMember>(initialMember)

	const firstLetters = getFirstLetters(member?.name || '')
	const bgColor = getAvatarColor(member?.name || '')

	const statusColor =
		member?.status === 'active'
			? 'bg-green-100 text-green-800 border-green-200'
			: 'bg-red-100 text-red-800 border-red-200'

	return (
		<>
			<Card>
				<CardContent>
					<div className='flex lg:items-center flex-col lg:flex-row gap-4'>
						<div className='flex-1 flex items-center gap-6'>
							<div className='flex flex-col items-center gap-2'>
								<Avatar className='size-18 text-white text-4xl'>
									<AvatarFallback className={bgColor}>
										{firstLetters}
									</AvatarFallback>
								</Avatar>
								<Badge variant='outline' className={statusColor}>
									{member.status === 'active' ? 'Активний' : 'Неактивний'}
								</Badge>
							</div>
							<div>
								<h1 className='text-3xl font-bold text-foreground mb-2'>
									{member?.name}
								</h1>
								<p className='text-lg text-muted-foreground'>{member?.role}</p>
							</div>
						</div>
						<div className='bg-muted/30 rounded-lg p-4'>
							<div className='flex items-center gap-3'>
								<div className='bg-green-100 p-2 rounded-lg'>
									<Mail className='h-5 w-5 text-green-600' />
								</div>
								<div className='min-w-0 flex-1'>
									<p className='text-sm text-muted-foreground'>Email</p>
									<p className='font-medium truncate' title={member.email}>
										{member.email}
									</p>
								</div>
							</div>
						</div>
						<div className='bg-muted/30 rounded-lg p-4'>
							<div className='flex items-center gap-3'>
								<div className='bg-primary/10 p-2 rounded-lg'>
									<Building2 className='h-5 w-5 text-primary' />
								</div>
								<div>
									<p className='text-sm text-muted-foreground'>Департамент</p>
									<p className='font-medium'>{member.department}</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<MemberTabs member={member} setMember={setMember} />
		</>
	)
}

export default MemberProfile
