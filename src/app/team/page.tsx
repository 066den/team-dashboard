import { Suspense } from 'react'
import PageHeading from '@/components/common/PageHeading'
import TeamList from '@/components/team/TeamList'
import TeamFilters from '@/components/team/TeamFilters'
import { TeamPageSkeleton } from '@/components/ui/Skeletons'

const TeamPage = () => {
	return (
		<div className='container mx-auto px-4 py-8'>
			<PageHeading title='Команда' description='Керівники та експерти'>
				<TeamFilters />
			</PageHeading>
			<Suspense fallback={<TeamPageSkeleton />}>
				<TeamList />
			</Suspense>
		</div>
	)
}

export default TeamPage
