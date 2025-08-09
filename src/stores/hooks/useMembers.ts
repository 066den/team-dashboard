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
		refreshMembers,
	} = useMembersStore()

	useEffect(() => {
		initialize()
	}, [initialize])

	useEffect(() => {
		if (!filteredMembers) {
			refreshMembers()
		}
	}, [filteredMembers, refreshMembers])

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
		refreshMembers,
	}
}
