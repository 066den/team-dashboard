'use client'

import MemberCardRow from './MemberCardRow'
import MemberCardGrid from './MemberCardGrid'

import { GridIcon, ListIcon } from 'lucide-react'
import { useMembers } from '@/hooks/busuness/useMembers'
import { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { TeamPageSkeleton } from '../ui/Skeletons'

const TeamList = () => {
	const { viewMode, setViewMode, fetchMembers, members } = useMembers()
	const [mounted, setMounted] = useState(false)

	const handleViewModeChange = (value: 'grid' | 'list') => {
		if (value) setViewMode(value)
	}

	useEffect(() => {
		fetchMembers()
		setMounted(true)
	}, [fetchMembers])

	if (!mounted) return <TeamPageSkeleton />

	const fullClassName =
		viewMode === 'grid'
			? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
			: 'flex flex-col gap-4'

	return (
		<>
			<div className='flex justify-end mb-4'>
				<ToggleGroup
					type='single'
					value={viewMode}
					onValueChange={handleViewModeChange}
					className='bg-muted p-1 rounded-md'
				>
					<ToggleGroupItem
						value='grid'
						aria-label='Grid view'
						className='data-[state=on]:bg-background '
					>
						<GridIcon className='h-4 w-4' />
						<span className='ml-2 hidden sm:inline'>Сетка</span>
					</ToggleGroupItem>

					<ToggleGroupItem
						value='list'
						aria-label='List view'
						className='data-[state=on]:bg-background'
					>
						<ListIcon className='h-4 w-4' />
						<span className='ml-2 hidden sm:inline'>Список</span>
					</ToggleGroupItem>
				</ToggleGroup>
			</div>
			<div className={fullClassName}>
				{members?.map((member, index) =>
					viewMode === 'grid' ? (
						<MemberCardGrid key={member.id} index={index} member={member} />
					) : (
						<MemberCardRow key={member.id} index={index} member={member} />
					)
				)}
			</div>
		</>
	)
}

export default TeamList
