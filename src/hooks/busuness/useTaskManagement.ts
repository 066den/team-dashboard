import { useCallback, useMemo, useState } from 'react'
import { useMembersStore } from '../../stores/membersStore'
import { Task, TaskStatus } from '@/types'

export const useTaskManagement = (memberId: string) => {
	const {
		tasks,
		isLoading,
		error,
		getMemberTasks,
		updateTaskStatus,
		fetchTasks,
	} = useMembersStore()

	const [draggedTask, setDraggedTask] = useState<string | null>(null)

	const memberTasks = useMemo(() => {
		return getMemberTasks(memberId)
	}, [getMemberTasks, memberId, tasks])

	const tasksByStatus = useMemo(() => {
		return {
			todo: memberTasks.filter(task => task.status === 'todo'),
			'in-progress': memberTasks.filter(task => task.status === 'in-progress'),
			done: memberTasks.filter(task => task.status === 'done'),
		}
	}, [memberTasks])

	const taskStats = useMemo(() => {
		const total = memberTasks.length
		const completed = tasksByStatus.done.length
		const inProgress = tasksByStatus['in-progress'].length
		const todo = tasksByStatus.todo.length

		return {
			total,
			completed,
			inProgress,
			todo,
			completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
		}
	}, [memberTasks, tasksByStatus])

	const handleDragStart = useCallback((taskId: string) => {
		setDraggedTask(taskId)
	}, [])

	const handleDragEnd = useCallback(() => {
		setDraggedTask(null)
	}, [])

	const handleDrop = useCallback(
		async (newStatus: TaskStatus) => {
			if (draggedTask) {
				await updateTaskStatus(draggedTask, newStatus)
				setDraggedTask(null)
			}
		},
		[draggedTask, updateTaskStatus]
	)

	const changeTaskStatus = useCallback(
		async (taskId: string, newStatus: TaskStatus) => {
			await updateTaskStatus(taskId, newStatus)
		},
		[updateTaskStatus]
	)

	const getDraggedTaskData = useCallback(
		(taskId: string): Task | undefined => {
			return memberTasks.find(task => task.id === taskId)
		},
		[memberTasks]
	)

	return {
		memberTasks,
		draggedTask,
		setDraggedTask,
		isLoading,
		error,
		tasksByStatus,
		taskStats,
		handleDragStart,
		handleDragEnd,
		handleDrop,
		changeTaskStatus,
		fetchTasks,
		getDraggedTaskData,
	}
}
