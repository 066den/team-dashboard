'use client'
import { useEffect } from 'react'
import { useMembersStore } from '../membersStore'

export const useMembers = () => {
	const {
		filteredMembers,
		filter,
		setFilter,
		isLoading,
		error,
		fetchMembers,
		initialize,
		isInitialized,
		viewMode,
		setViewMode,
	} = useMembersStore()

	useEffect(() => {
		initialize()
	}, [initialize])

	return {
		members: filteredMembers,
		filter,
		setFilter,
		isLoading,
		error,
		fetchMembers,
		initialize,
		isInitialized,
		viewMode,
		setViewMode,
	}
}
