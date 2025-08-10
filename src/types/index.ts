export interface TeamMember {
	id: string
	name: string
	role: string
	department: Department
	status: 'active' | 'inactive'
	phone?: string
	telegram?: string
	email?: string
	joinDate?: string
	avatar?: string
}

export interface TeamFilter {
	department: Department | ''
	search: string
}

export interface Task {
	id: string
	title: string
	description: string
	status: 'todo' | 'in-progress' | 'done'
	priority: 'low' | 'medium' | 'high'
	assigneeId: string
	createdAt: string
	dueDate?: string
}

export type TaskStatus = Task['status']

export enum Department {
	ALL = 'Усі департаменти',
	SALES = 'Продажі',
	FINANCE = 'Фінанси',
	IT = 'Технічний',
}

export enum Roles {
	DEVELOPER = 'Developer',
	TEAM_LEAD = 'Team Lead',
}
