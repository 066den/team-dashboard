import { Task, TaskStatus } from '@/types'
import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { AlertCircle, Calendar, Clock } from 'lucide-react'
import { Button } from '../ui/button'

type TaskCardProps = {
	task: Task
	onStatusChange: (taskId: string, newStatus: TaskStatus) => void
	onDragStart: (taskId: string) => void
	isPreview?: boolean
}

const TaskCard = ({
	task,
	onStatusChange,
	onDragStart,
	isPreview,
}: TaskCardProps) => {
	const [isDragOver, setIsDragOver] = useState(false)

	const priorityColors = {
		low: 'bg-gray-100 text-gray-800 border-gray-200',
		medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
		high: 'bg-red-100 text-red-800 border-red-200',
	}

	const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()

	const handleDragStart = (e: React.DragEvent) => {
		if (isPreview) return
		e.dataTransfer.setData('task/id', task.id)
		e.dataTransfer.effectAllowed = 'move'
		onDragStart(task.id)
	}

	const handleStatusChange = (newStatus: TaskStatus) => {
		if (isPreview) return
		onStatusChange(task.id, newStatus)
	}

	const getCardClassName = () => {
		let classes = 'mb-3 transition-all duration-200'

		if (isPreview) {
			classes += ' opacity-80 border-2 border-dashed border-blue-500 bg-blue-50'
		} else {
			classes += ' cursor-move hover:shadow-md'
			if (isDragOver) {
				classes += ' ring-2 ring-primary'
			}
		}

		return classes
	}

	return (
		<Card
			className={getCardClassName()}
			draggable={!isPreview}
			onDragStart={handleDragStart}
			onDragEnter={() => setIsDragOver(true)}
			onDragLeave={() => setIsDragOver(false)}
		>
			<CardContent className='p-4'>
				<div className='space-y-3'>
					<div className='flex items-start justify-between'>
						<h4 className='font-medium text-sm leading-tight'>{task.title}</h4>
						<Badge
							variant='outline'
							className={`text-xs shrink-0 ml-2 ${
								priorityColors[task.priority]
							}`}
						>
							{task.priority}
						</Badge>
					</div>

					{task.description && (
						<p className='text-xs text-muted-foreground line-clamp-2'>
							{task.description}
						</p>
					)}

					<div className='flex items-center justify-between text-xs text-muted-foreground'>
						{task.dueDate && (
							<div
								className={`flex items-center ${
									isOverdue ? 'text-red-600' : ''
								}`}
							>
								{isOverdue ? (
									<AlertCircle className='h-3 w-3 mr-1' />
								) : (
									<Calendar className='h-3 w-3 mr-1' />
								)}
								{new Date(task.dueDate).toLocaleDateString('uk-UA')}
							</div>
						)}

						<div className='flex items-center'>
							<Clock className='h-3 w-3 mr-1' />
							{new Date(task.createdAt).toLocaleDateString('uk-UA')}
						</div>
					</div>

					{!isPreview && (
						<div className='flex gap-1'>
							{task.status !== 'todo' && (
								<Button
									variant='ghost'
									size='sm'
									className='h-6 px-2 text-xs'
									onClick={() => handleStatusChange('todo')}
								>
									До виконання
								</Button>
							)}
							{task.status !== 'in-progress' && (
								<Button
									variant='ghost'
									size='sm'
									className='h-6 px-2 text-xs'
									onClick={() => handleStatusChange('in-progress')}
								>
									В роботі
								</Button>
							)}
							{task.status !== 'done' && (
								<Button
									variant='ghost'
									size='sm'
									className='h-6 px-2 text-xs'
									onClick={() => handleStatusChange('done')}
								>
									Виконано
								</Button>
							)}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default TaskCard
