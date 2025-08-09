import { delayApiCall } from '@/lib/utils'
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
				set({ isLoading: true })
				try {
					if (!get().isInitialized) {
						const members = await getMembers()
						if (!members) {
							throw new Error('Failed to fetch team members')
						}
						set({ members })
					}
					await delayApiCall(10000)
					set({ filteredMembers: get().members })
				} catch (error) {
					console.error('Error fetching team members:', error)
					set({ error: 'Failed to fetch team members' })
					set({ isInitialized: false })
				} finally {
					set({ isLoading: false })
				}
			},
			setFilter: (filter: TeamFilter) => {
				set({
					filter,
					filteredMembers: get().members.filter(
						member =>
							member.department === filter.department ||
							member.name.toLowerCase().includes(filter.search.toLowerCase())
					),
				})
			},
			initialize: async () => {
				set({ isLoading: true })
				await get().fetchMembers()
				set({ isInitialized: true })

				set({ isLoading: false })
			},
		}),
		{
			name: 'members-store',
			partialize: state => ({
				members: state.members,
				isInitialized: state.isInitialized,
			}),
			storage: createJSONStorage(() => localStorage),
		}
	)
)
