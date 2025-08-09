import mockTeams from '@/data/teams.json'
import { delayApiCall } from '@/lib/utils'
import { TeamMember } from '@/types'

const currentTeams = mockTeams.teams

export const getMembers = async (): Promise<TeamMember[]> => {
	await delayApiCall(1000)
	return currentTeams as TeamMember[]
}
