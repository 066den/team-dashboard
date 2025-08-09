import { useMembers } from '@/stores/hooks/useMembers'
import MemberCardRow from './MemberCardRow'

const TeamListRow = () => {
	const { members } = useMembers()
	return (
		members && (
			<div className='flex flex-col gap-4'>
				{members.map((member, index) => (
					<MemberCardRow key={member.id} index={index} member={member} />
				))}
			</div>
		)
	)
}

export default TeamListRow
