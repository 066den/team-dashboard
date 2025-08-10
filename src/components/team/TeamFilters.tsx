'use client'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/Select'
import SearchInput from '../ui/SearchInput'
import { Department } from '@/types'
import { useMembers } from '@/hooks/busuness/useMembers'

const TeamFilters = () => {
	const departments = Object.values(Department)
	const { searchQuery, handleSearch, handleDepartmentChange } = useMembers()

	return (
		<div className='flex flex-col sm:flex-row w-full gap-4'>
			<SearchInput value={searchQuery} onChange={handleSearch} />
			<Select onValueChange={handleDepartmentChange}>
				<SelectTrigger className='sm:w-[240px] max-w-md w-full'>
					<SelectValue placeholder='Виберіть департамент' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{departments.map(department => (
							<SelectItem key={department} value={department}>
								{department}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}

export default TeamFilters
