'use client'
import { TeamMember } from '@/types'
import MemberCardRow from './MemberCardRow'
import MemberCardGrid from './MemberCardGrid'

type TeamListProps = {
	members: TeamMember[] | null
	viewMode: 'grid' | 'list'
}

const TeamList = ({ members, viewMode }: TeamListProps) => {
	const fullClassName =
		viewMode === 'grid'
			? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
			: 'flex flex-col gap-4'

	return (
		<div className={fullClassName}>
			{members?.map((member, index) =>
				viewMode === 'grid' ? (
					<MemberCardGrid key={member.id} index={index} member={member} />
				) : (
					<MemberCardRow key={member.id} index={index} member={member} />
				)
			)}
		</div>
	)
}

export default TeamList
