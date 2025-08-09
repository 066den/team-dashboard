import { NextResponse } from 'next/server'
import mockTeams from '@/data/teams.json'

export async function GET() {
	const currentTeams = mockTeams.teams
	return NextResponse.json(currentTeams)
}
