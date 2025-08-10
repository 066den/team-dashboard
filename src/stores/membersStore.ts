import { delayApiCall } from '@/lib/utils'
import { getMembers, getTasks } from '@/services/mockApi'
import { Task, TaskStatus, TeamMember } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MembersStore {
	members: TeamMember[]
	filteredMembers: TeamMember[]
	viewMode: 'grid' | 'list'
	tasks: Task[]
	isLoading: boolean
	error: string | null

	fetchMembers: () => Promise<void>
	fetchTasks: () => Promise<void>
	updateMember: (id: string, update: Partial<TeamMember>) => Promise<void>
	updateTaskStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>
	getMemberTasks: (memberId: string) => Task[]
	setViewMode: (viewMode: 'grid' | 'list') => void
	setFilteredMembers: (filteredMembers: TeamMember[]) => void

	isHydrated: boolean
	setIsHydrated: () => void
}

export const useMembersStore = create<MembersStore>()(
	persist(
		(set, get) => ({
			members: [],
			filteredMembers: [],
			tasks: [],
			isLoading: false,
			error: null,
			viewMode: 'grid',
			isHydrated: false,
			setIsHydrated: () => set({ isHydrated: true }),
			setFilteredMembers: (filteredMembers: TeamMember[]) => {
				set({ filteredMembers })
			},
			setViewMode: (viewMode: 'grid' | 'list') => {
				set({ viewMode })
			},

			fetchMembers: async () => {
				set({ isLoading: true, error: null })

				try {
					const storedMembers = get().members || []
					if (storedMembers.length > 0) {
						await delayApiCall()
						if (Math.random() < 0.05) {
							throw new Error('Failed to fetch team members')
						}
						set({ members: storedMembers })
					} else {
						const originalMembers = await getMembers()
						if (!originalMembers) {
							throw new Error('Failed to fetch team members')
						}
						set({ members: originalMembers })
					}
				} catch (error) {
					console.error('Error fetching team members:', error)
					set({ error: 'Failed to fetch team members' })
				} finally {
					set({ isLoading: false })
				}
			},

			fetchTasks: async () => {
				set({ isLoading: true, error: null })
				try {
					const storedTasks = get().tasks || []
					if (storedTasks.length > 0) {
						await delayApiCall()
						if (Math.random() < 0.05) {
							throw new Error('Failed to fetch team members')
						}
						set({ tasks: storedTasks })
					} else {
						const originalTasks = await getTasks()
						if (!originalTasks) {
							throw new Error('Failed to fetch team members')
						}
						set({ tasks: originalTasks })
					}
				} catch (error) {
					console.error('Error fetching tasks:', error)
					set({ error: 'Failed to fetch tasks' })
				} finally {
					set({ isLoading: false })
				}
			},

			updateMember: async (id: string, update: Partial<TeamMember>) => {
				const { members } = get()
				if (!members) {
					throw new Error('Members not found')
				}
				const updatedMembers = members.map(member =>
					member.id === id ? { ...member, ...update } : member
				)
				set({ members: updatedMembers })

				try {
					await delayApiCall()
					if (Math.random() < 0.05) {
						throw new Error('Failed to update member')
					}
				} catch (error) {
					console.error('Error updating member:', error)
					set({ members, error: 'Failed to update member' })
				}
			},

			updateTaskStatus: async (taskId: string, newStatus: TaskStatus) => {
				const { tasks } = get()

				const updatedTasks = tasks.map(task =>
					task.id === taskId ? { ...task, status: newStatus } : task
				)

				set({ tasks: updatedTasks })

				try {
					await delayApiCall()
					if (Math.random() < 0.05) {
						throw new Error('Failed to update task status')
					}
				} catch (error) {
					console.error('Error updating task status:', error)
					set({ tasks, error: 'Failed to update task status' })
				}
			},

			getMemberTasks: (memberId: string) => {
				const { tasks } = get()
				if (!tasks) {
					return []
				}
				return tasks.filter(task => task.assigneeId === memberId)
			},
		}),
		{
			name: 'members-store',
			partialize: state => ({
				members: state.members,
				tasks: state.tasks,
				viewMode: state.viewMode,
			}),
			storage: createJSONStorage(() => {
				if (typeof window !== 'undefined') {
					return localStorage
				}
				return {
					getItem: () => null,
					setItem: () => {},
					removeItem: () => {},
				}
			}),
			onRehydrateStorage: () => state => {
				state?.setIsHydrated()
			},
		}
	)
)
