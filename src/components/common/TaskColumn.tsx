import { Badge } from '@/components/ui/badge'
import { Task, TaskStatus } from '@/types'
import { useState } from 'react'
import TaskCard from './TaskCard'

type ColumnProps = {
	title: string
	status: TaskStatus
	tasks: Task[]
	onDrop: (status: TaskStatus) => void
	onStatusChange: (taskId: string, newStatus: TaskStatus) => void
	onDragStart: (taskId: string) => void
	draggedTask: string | null
	getDraggedTaskData: (taskId: string) => Task | undefined
}

const TaskColumn = ({
	title,
	status,
	tasks,
	onDrop,
	onStatusChange,
	onDragStart,
	draggedTask,
	getDraggedTaskData,
}: ColumnProps) => {
	const [isDragOver, setIsDragOver] = useState(false)

	const statusColors = {
		todo: 'bg-gray-50 border-gray-200',
		'in-progress': 'bg-blue-50 border-blue-200',
		done: 'bg-green-50 border-green-200',
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
		setIsDragOver(true)
	}

	const handleDragLeave = (e: React.DragEvent) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX
		const y = e.clientY

		if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
			setIsDragOver(false)
		}
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragOver(false)
		onDrop(status)
	}

	const draggedTaskData = draggedTask ? getDraggedTaskData(draggedTask) : null

	const shouldShowPreview =
		isDragOver &&
		draggedTask &&
		draggedTaskData &&
		draggedTaskData.status !== status

	const visibleTasks = tasks

	const badgeCount = shouldShowPreview
		? visibleTasks.filter(task => task.id !== draggedTask).length + 1
		: visibleTasks.filter(task => task.id !== draggedTask).length

	return (
		<div
			className={`flex-1 min-h-[500px] p-4 rounded-lg border-2 transition-colors ${
				isDragOver ? 'border-primary bg-primary/5' : statusColors[status]
			}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='font-semibold text-sm'>{title}</h3>
				<Badge
					variant='secondary'
					className={`text-xs transition-colors ${
						shouldShowPreview ? 'bg-primary text-primary-foreground' : ''
					}`}
				>
					{shouldShowPreview ? badgeCount : visibleTasks.length}
				</Badge>
			</div>

			<div className='space-y-2'>
				{shouldShowPreview && draggedTaskData && (
					<TaskCard
						task={{ ...draggedTaskData, status }}
						onStatusChange={onStatusChange}
						onDragStart={onDragStart}
						isPreview={true}
					/>
				)}
				{visibleTasks.map(task => (
					<TaskCard
						key={task.id}
						task={task}
						onStatusChange={onStatusChange}
						onDragStart={onDragStart}
					/>
				))}

				{visibleTasks.length === 0 && !shouldShowPreview && (
					<div className='text-center py-8 text-muted-foreground text-sm'>
						{isDragOver ? 'Отпустите, чтобы переместить сюда' : 'Немає завдань'}
					</div>
				)}
			</div>
		</div>
	)
}

export default TaskColumn
