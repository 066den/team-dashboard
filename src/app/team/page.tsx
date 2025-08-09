'use client'
import PageHeading from '@/components/common/PageHeading'
import TeamListGrid from '@/components/team/TeamListGrid'
import TeamListRow from '@/components/team/TeamListRow'
import { useMembers } from '@/stores/hooks/useMembers'

const TeamPage = () => {
	const { viewMode, setViewMode } = useMembers()

	return (
		<div className='container mx-auto px-4 py-8'>
			<PageHeading title='Команда' description='Керівники та експерти' />
			{viewMode === 'grid' ? <TeamListGrid /> : <TeamListRow />}
		</div>
	)
}

export default TeamPage
