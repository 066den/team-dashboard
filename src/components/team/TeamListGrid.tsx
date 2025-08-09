import { useMembers } from '@/stores/hooks/useMembers'
import TeamCard from './MemberCardGrid'

const TeamListGrid = () => {
	const { members } = useMembers()
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
			{members.map(member => (
				<TeamCard key={member.id} {...member} />
			))}
		</div>
	)
}

export default TeamListGrid
