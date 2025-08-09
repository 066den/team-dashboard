import { delayApiCall, filterMembers } from '@/lib/utils'
import { getMembers } from '@/services/getMembers'
import { TeamFilter, TeamMember } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MembersStore {
	members: TeamMember[]
	filteredMembers: TeamMember[] | null
	viewMode: 'grid' | 'list'
	setViewMode: (viewMode: 'grid' | 'list') => void
	fetchMembers: () => Promise<void>
	refreshMembers: () => Promise<void>
	filter: TeamFilter
	setFilter: (filter: TeamFilter) => void
	initialize: () => void
	isLoading: boolean
	error: string | null
	isInitialized: boolean
}

export const useMembersStore = create<MembersStore>()(
	persist(
		(set, get) => ({
			members: [],
			filter: {
				department: '',
				search: '',
			},
			filteredMembers: null,
			viewMode: 'grid',
			isLoading: false,
			error: null,
			isInitialized: false,
			setViewMode: (viewMode: 'grid' | 'list') => {
				set({ viewMode })
			},
			fetchMembers: async () => {
				set({ isLoading: true, error: null })
				try {
					const members = await getMembers()
					if (!members) {
						throw new Error('Failed to fetch team members')
					}

					set({ members, filteredMembers: members, isInitialized: true })
				} catch (error) {
					console.error('Error fetching team members:', error)
					set({ error: 'Failed to fetch team members' })
					set({ isInitialized: false })
				} finally {
					set({ isLoading: false })
				}
			},
			refreshMembers: async () => {
				await delayApiCall()
				if (Math.random() < 0.05) {
					throw new Error('Failed to fetch team members')
				}
				set({ filteredMembers: get().members })
			},
			setFilter: (filter: TeamFilter) => {
				const members = get().members
				const filtered = filterMembers(members, filter)
				set({
					filter,
					filteredMembers: filtered,
				})
			},
			initialize: async () => {
				if (!get().isInitialized) {
					await get().fetchMembers()
				}
			},
		}),
		{
			name: 'members-store',
			partialize: state => ({
				members: state.members,
				isInitialized: state.isInitialized,
				viewMode: state.viewMode,
			}),
			storage: createJSONStorage(() => localStorage),
		}
	)
)
