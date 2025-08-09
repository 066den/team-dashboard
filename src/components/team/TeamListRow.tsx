import { useMembers } from '@/stores/hooks/useMembers'
import MemberCardRow from './MemberCardRow'

const TeamListRow = () => {
	const { members } = useMembers()
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
			{members.map(member => (
				<MemberCardRow key={member.id} {...member} />
			))}
		</div>
	)
}

export default TeamListRow
