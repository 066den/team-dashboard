import { delayApiCall } from '@/lib/utils'
import { TeamMember } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MembersStore {
	members: TeamMember[]
	viewMode: 'grid' | 'list'
	setViewMode: (viewMode: 'grid' | 'list') => void
	fetchMembers: () => Promise<void>
	initialize: () => void
	isLoading: boolean
	error: string | null
	isInitialized: boolean
}

export const useMembersStore = create<MembersStore>()(
	persist(
		(set, get) => ({
			members: [],
			viewMode: 'grid',
			isLoading: false,
			error: null,
			isInitialized: false,
			setViewMode: (viewMode: 'grid' | 'list') => {
				set({ viewMode })
			},
			fetchMembers: async () => {
				set({ isLoading: true })
				await delayApiCall(1000)
				try {
					const response = await fetch('/api/teams')
					if (!response.ok) {
						throw new Error('Failed to fetch team members')
					}

					const data = await response.json()
					set({ members: data })
				} catch (error) {
					console.error('Error fetching team members:', error)
					set({ error: 'Failed to fetch team members' })
					set({ isInitialized: false })
				} finally {
					set({ isLoading: false })
				}
			},
			initialize: async () => {
				set({ isLoading: true })
				if (!get().isInitialized) {
					await get().fetchMembers()
					set({ isInitialized: true })
				}
				set({ isLoading: false })
			},
		}),
		{
			name: 'members-store',
			partialize: state => ({ members: state.members }),
			storage: createJSONStorage(() => localStorage),
		}
	)
)
