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
import { useMembersStore } from '@/stores/membersStore'
import { debounce } from '@/lib/utils'
import { useCallback, useMemo } from 'react'

const TeamFilters = () => {
	const departments = Object.values(Department)
	const { filter, setFilter } = useMembersStore()

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				setFilter({ ...filter, search: value })
			}, 300),
		[filter, setFilter]
	)

	const setSearchTerm = useCallback(
		(value: string) => {
			debouncedSearch(value)
		},
		[debouncedSearch]
	)

	return (
		<div className='flex flex-col sm:flex-row w-full gap-4'>
			<SearchInput value={filter.search} onChange={setSearchTerm} />
			<Select>
				<SelectTrigger className='sm:w-[240px] max-w-md w-full'>
					<SelectValue placeholder='Виберіть департамент' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='all'>Усі департаменти</SelectItem>
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
