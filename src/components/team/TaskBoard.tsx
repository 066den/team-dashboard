import { useTaskManagement } from '@/hooks/busuness/useTaskManagement'
import TaskColumn from '../common/TaskColumn'
import { TaskStatus } from '@/types'
import { useEffect } from 'react'
import { TaskBoardSkeleton } from '../ui/Skeletons'

type Props = {
	memberId: string
}

const TaskBoard = ({ memberId }: Props) => {
	const {
		tasksByStatus,
		isLoading,
		draggedTask,
		fetchTasks,
		handleDragEnd,
		handleDrop,
		changeTaskStatus,
		handleDragStart,
		getDraggedTaskData,
	} = useTaskManagement(memberId)

	const handleColumnDrop = (status: TaskStatus) => {
		handleDrop(status)
	}

	useEffect(() => {
		fetchTasks()
	}, [fetchTasks])

	if (isLoading) return <TaskBoardSkeleton />

	return (
		<div className='space-y-4'>
			<div className='text-sm text-muted-foreground'>
				Перетягніть завдання між колонками або використовуйте кнопки для зміни
				статусу
			</div>

			<div className='grid gap-4 md:grid-cols-3' onDragEnd={handleDragEnd}>
				<TaskColumn
					title='До виконання'
					status='todo'
					tasks={tasksByStatus.todo}
					onDrop={handleColumnDrop}
					onStatusChange={changeTaskStatus}
					onDragStart={handleDragStart}
					draggedTask={draggedTask}
					getDraggedTaskData={getDraggedTaskData}
				/>

				<TaskColumn
					title='В роботі'
					status='in-progress'
					tasks={tasksByStatus['in-progress']}
					onDrop={handleColumnDrop}
					onStatusChange={changeTaskStatus}
					onDragStart={handleDragStart}
					draggedTask={draggedTask}
					getDraggedTaskData={getDraggedTaskData}
				/>

				<TaskColumn
					title='Виконано'
					status='done'
					tasks={tasksByStatus.done}
					onDrop={handleColumnDrop}
					onStatusChange={changeTaskStatus}
					onDragStart={handleDragStart}
					draggedTask={draggedTask}
					getDraggedTaskData={getDraggedTaskData}
				/>
			</div>
		</div>
	)
}

export default TaskBoard
