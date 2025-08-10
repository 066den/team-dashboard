'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMembersStore } from '../../stores/membersStore'
import { Department, TeamMember } from '@/types'
import { debounce } from '@/lib/utils'

export const useMembers = () => {
	const {
		members,
		filteredMembers,
		isLoading,
		error,
		fetchMembers,
		viewMode,
		setViewMode,
		setFilteredMembers,
	} = useMembersStore()

	const [searchQuery, setSearchQuery] = useState('')
	const [selectedDepartment, setSelectedDepartment] =
		useState<Department | null>(null)

	useEffect(() => {
		if (!members || members.length === 0) return

		let result = [...members]

		if (selectedDepartment && selectedDepartment !== Department.ALL) {
			result = result.filter(member => member.department === selectedDepartment)
		}

		if (searchQuery.trim()) {
			result = result.filter(member =>
				member.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		setFilteredMembers(result)
	}, [members, selectedDepartment, searchQuery, setFilteredMembers])

	const debouncedSetSearch = useMemo(
		() =>
			debounce((query: string) => {
				console.log('Search query changed:', query)
				setSearchQuery(query)
			}, 300),
		[]
	)

	const handleSearch = useCallback(
		(query: string) => {
			debouncedSetSearch(query)
		},
		[debouncedSetSearch]
	)

	const handleDepartmentChange = useCallback((department: Department) => {
		setSelectedDepartment(department)
	}, [])

	return {
		members: filteredMembers,
		isLoading,
		error,
		fetchMembers,
		viewMode,
		setViewMode,
		handleSearch,
		handleDepartmentChange,
		searchQuery,
		selectedDepartment,
	}
}
