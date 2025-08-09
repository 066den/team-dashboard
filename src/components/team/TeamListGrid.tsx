import { useMembers } from '@/stores/hooks/useMembers'
import TeamCard from './MemberCardGrid'

const TeamListGrid = () => {
	const { members } = useMembers()
	return (
		members && (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{members.map((member, index) => (
					<TeamCard key={member.id} index={index} member={member} />
				))}
			</div>
		)
	)
}

export default TeamListGrid
