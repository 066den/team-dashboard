'use client'
import PageHeading from '@/components/common/PageHeading'

import TeamList from '@/components/team/TeamList'
import TeamFilters from '@/components/team/TeamFilters'
import { Suspense } from 'react'

const TeamPage = () => {
	return (
		<div className='container mx-auto px-4 py-8'>
			<PageHeading title='Команда' description='Керівники та експерти'>
				<TeamFilters />
			</PageHeading>
			<Suspense fallback={<div>Loading...</div>}>
				<TeamList />
			</Suspense>
		</div>
	)
}

export default TeamPage
