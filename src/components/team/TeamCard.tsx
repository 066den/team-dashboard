import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { TeamMember } from '@/types'

const TeamCard = ({ name, avatar }: TeamMember) => {
	return (
		<Link href='/team/1'>
			<div className='bg-white border border-grey-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 cursor-pointer'>
				<div className='flex items-center gap-4'>
					<Avatar>
						<AvatarImage src={avatar} />
						<AvatarFallback>{name.charAt(0)}</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</Link>
	)
}

export default TeamCard
