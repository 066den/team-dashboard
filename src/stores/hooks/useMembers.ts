'use client'
import { useEffect } from 'react'
import { useMembersStore } from '../membersStore'

export const useMembers = () => {
	const {
		members,
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
		members,
		isLoading,
		error,
		fetchMembers,
		initialize,
		isInitialized,
		viewMode,
		setViewMode,
	}
}
