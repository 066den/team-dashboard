import mockTeams from '@/data/teams.json'
import mockTasks from '@/data/tasks.json'
import { delayApiCall } from '@/lib/utils'
import { Task, TeamMember } from '@/types'

export const getMembers = async (): Promise<TeamMember[]> => {
	await delayApiCall()
	return mockTeams.teams as TeamMember[]
}

export const getMember = async (id: string): Promise<TeamMember> => {
	await delayApiCall()
	return mockTeams.teams.find(member => member.id === id) as TeamMember
}

export const getTasks = async (): Promise<Task[]> => {
	await delayApiCall()
	return mockTasks.mockTasks as Task[]
}
