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
	]

	const colorIndex = name.length % colors.length
	return colors[colorIndex]
}

// Delay utility (simulate API calls)
export const delayApiCall = (ms: number): Promise<void> =>
	new Promise(resolve => setTimeout(resolve, ms))

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
	let timeout: NodeJS.Timeout

	return (...args: Args) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => func(...args), ms)
	}
}
