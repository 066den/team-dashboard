import teamsData from '@/data/teams.json'
import tasksData from '@/data/tasks.json'

import { delayApiCall, simulateApiError } from '@/lib/utils'
import { Task, TeamMember } from '@/types'

const mockMembers = teamsData.teamsData as TeamMember[]
const mockTasks = tasksData.tasksData as Task[]

export const getMembers = async (): Promise<TeamMember[]> => {
	await delayApiCall()
	simulateApiError()
	return mockMembers
}

export const getMember = async (id: string): Promise<TeamMember> => {
	await delayApiCall()
	simulateApiError()
	return mockMembers.find(member => member.id === id) as TeamMember
}

export const getTasks = async (): Promise<Task[]> => {
	await delayApiCall()
	return mockTasks
}
