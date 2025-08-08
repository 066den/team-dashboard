export interface TeamMember {
	id: string
	name: string
	role: string
	department: Department
	status: 'active' | 'inactive'
	phone?: string
	telegram?: string
	email?: string
	joinDate: string
	avatar?: string
}

export interface TeamFilter {
	department: Department | ''
	status: 'active' | 'inactive'
	search: string
	sort: 'name' | 'role' | 'department' | 'status'
	order: 'asc' | 'desc'
	page: number
	limit: number
}

export interface Task {
	id: string
	title: string
	description: string
	status: TaskStatus
	priority: 'low' | 'medium' | 'high'
	assigneeId: string
	createdAt: string
	updatedAt: string
}

export enum TaskStatus {
	TODO = 'todo',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
}

export enum Department {
	SALES = 'Продажі',
	FINANCE = 'Фінанси',
	IT = 'Технічний',
}

export enum Roles {
	DEVELOPER = 'Developer',
	TEAM_LEAD = 'Team Lead',
}
