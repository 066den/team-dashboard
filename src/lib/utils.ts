import { Department, TeamFilter, TeamMember } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Generate avatar initials
export const getAvatarColor = (name: string): string => {
	const colors = [
		'bg-red-500',
		'bg-blue-500',
		'bg-green-500',
		'bg-yellow-500',
		'bg-purple-500',
		'bg-pink-500',
		'bg-indigo-500',
		'bg-teal-500',
		'bg-orange-500',
		'bg-cyan-500',
	]

	const colorIndex = name.length % colors.length
	return colors[colorIndex]
}

// Delay utility (simulate API calls)
export const delayApiCall = (): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))
}

// Simulate API error (5% chance)
export const simulateApiError = (): void => {
	if (Math.random() < 0.05) {
		throw new Error("Помилка з'єднання з сервером")
	}
}

// Get first letters of a name
export const getFirstLetters = (name: string, count = 2) => {
	return name
		.replace(/[.,!@#$%^&*()_+=\-`~[\]/\\{}:"|<>?]+/gi, '')
		.trim()
		.split(/\s+/)
		.slice(0, count)
		.map((word: string) => {
			if (!word.length) return ''
			return word.match(/./u)![0].toUpperCase()
		})
		.join('')
}

// Debounce function
export const debounce = <Args extends unknown[]>(
	func: (...args: Args) => void,
	ms: number
): ((...args: Args) => void) => {
	let timeout: NodeJS.Timeout | null = null

	return (...args: Args) => {
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => func(...args), ms)
	}
}

// Filter members based on department and search
export const filterMembers = (
	members: TeamMember[],
	filter: TeamFilter
): TeamMember[] => {
	return members.filter(member => {
		const matchesDepartment =
			!filter.department ||
			filter.department === Department.ALL ||
			member.department === filter.department

		const matchesSearch =
			!filter.search ||
			member.name.toLowerCase().includes(filter.search.toLowerCase()) ||
			member.role.toLowerCase().includes(filter.search.toLowerCase())

		return matchesDepartment && matchesSearch
	})
}

export const formatPhoneNumber = (phone: string): string => {
	const digits = phone.replace(/\D/g, '').slice(0, 12)
	if (digits.length <= 2) return digits
	if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`
	if (digits.length <= 8)
		return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`
	if (digits.length <= 10)
		return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
			5,
			8
		)} ${digits.slice(8)}`
	return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
		5,
		8
	)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`
}

export const isValidPhoneNumber = (phone: string): boolean => {
	console.log(phone)
	const phoneRegex = /^\+380\d{9}$/
	return phoneRegex.test(phone.replace(/\D/g, '').replace(/^380/, '+380'))
}

export const isValidTelegram = (telegram: string): boolean => {
	const telegramRegex = /^@[a-zA-Z0-9_]{5,32}$/
	return telegramRegex.test(telegram)
}

// Export to CSV
export const exportTeamToCSV = (members: TeamMember[]) => {
	const headers = [
		'ID',
		"Ім'я",
		'Роль',
		'Департамент',
		'Статус',
		'Телефон',
		'Telegram',
		'Email',
		'Дата приєднання',
	]

	const csvData = members.map(member => [
		member.id,
		member.name,
		member.role,
		member.department,
		member.status === 'active' ? 'Активний' : 'Неактивний',
		member.phone || '',
		member.telegram || '',
		member.email || '',
		member.joinDate ? formatDate(member.joinDate) : '',
	])

	const csvContent = [headers, ...csvData]
		.map(row =>
			row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
		)
		.join('\n')

	const BOM = '\uFEFF'
	const csvWithBOM = BOM + csvContent

	const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' })
	const link = document.createElement('a')

	if (link.download !== undefined) {
		const url = URL.createObjectURL(blob)
		link.setAttribute('href', url)
		link.setAttribute(
			'download',
			`team-export-${new Date().toISOString().split('T')[0]}.csv`
		)
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}
}

// Format date for CSV
const formatDate = (dateString: string): string => {
	try {
		const date = new Date(dateString)
		return date.toLocaleDateString('uk-UA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})
	} catch {
		return dateString
	}
}
