import { delayApiCall, simulateApiError } from '@/lib/utils'
import { getMembers, getTasks } from '@/services/mockApi'
import { Task, TaskStatus, TeamMember } from '@/types'
import { toast } from 'sonner'
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
						simulateApiError()
						set({ members: storedMembers })
					} else {
						const originalMembers = await getMembers()
						if (!originalMembers) {
							throw new Error('Помилка отримання членів команди')
						}
						set({ members: originalMembers })
					}
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Неизвестная ошибка'
					toast.error(errorMessage)
					set({ error: errorMessage })
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
						simulateApiError()
						set({ tasks: storedTasks })
					} else {
						const originalTasks = await getTasks()
						if (!originalTasks) {
							throw new Error('Помилка отримання завдань')
						}
						set({ tasks: originalTasks })
					}
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Неизвестная ошибка'
					toast.error(errorMessage)
					set({ error: errorMessage })
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
					simulateApiError()
				} catch (error) {
					set({ members, error: 'Failed to update member' })
					throw new Error(
						error instanceof Error ? error.message : 'Неизвестная ошибка'
					)
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
					simulateApiError()
					toast.success('Статус завдання оновлено успішно')
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Неизвестная ошибка'
					set({ tasks, error: errorMessage })
					toast.error(errorMessage)
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
