import { useState } from 'react'
import { Edit, Phone, Save, X } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { TeamMember } from '@/types'
import { Input } from '../ui/input'
import TaskBoard from './TaskBoard'
import { useMembers } from '@/hooks/busuness/useMembers'
import { toast } from 'sonner'

type Props = {
	member: TeamMember
	setMember: (member: TeamMember) => void
}

const MemberTabs = ({ member, setMember }: Props) => {
	const { updateMember } = useMembers()

	const [isEditing, setIsEditing] = useState(false)
	const [editForm, setEditForm] = useState({
		phone: member.phone || '',
		telegram: member.telegram || '',
	})

	const handleSave = async () => {
		try {
			const updatedData = {
				phone: editForm.phone || undefined,
				telegram: editForm.telegram || undefined,
			}

			await updateMember(member.id, updatedData)
			setMember({ ...member, ...updatedData })
			setIsEditing(false)
			toast.success('Профіль оновлено успішно')
		} catch (error) {
			toast.error(error instanceof Error && error.message)
		}
	}

	const handleCancel = () => {
		setEditForm({
			phone: member.phone || '',
			telegram: member.telegram || '',
		})
		setIsEditing(false)
	}

	return (
		<Tabs defaultValue='personal-info' className='space-y-4'>
			<TabsList className='grid w-full grid-cols-2 bg-muted p-1 rounded-lg'>
				<TabsTrigger
					value='personal-info'
					className='data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
				>
					Особиста інформація
				</TabsTrigger>
				<TabsTrigger
					value='tasks'
					className='data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
				>
					Задачі
				</TabsTrigger>
			</TabsList>
			<TabsContent value='personal-info' className='space-y-4'>
				<Card>
					<CardHeader className='flex flex-row justify-end'>
						{!isEditing ? (
							<Button
								variant='outline'
								size='sm'
								onClick={() => setIsEditing(true)}
							>
								<Edit className='h-4 w-4 mr-2' />
								Редагувати
							</Button>
						) : (
							<div className='flex gap-2'>
								<Button variant='outline' size='sm' onClick={handleSave}>
									<Save className='h-4 w-4 mr-2' />
									Зберегти
								</Button>
								<Button variant='ghost' size='sm' onClick={handleCancel}>
									<X className='h-4 w-4 mr-2' />
									Скасувати
								</Button>
							</div>
						)}
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid gap-4 md:grid-cols-2'>
							<div className='space-y-2'>
								<div className='bg-muted/30 rounded-lg p-4'>
									<div className='flex items-center gap-3'>
										<div className='bg-yellow-100 p-2 rounded-lg'>
											<Phone className='h-5 w-5 text-yellow-600' />
										</div>
										<div>
											<p className='text-sm text-muted-foreground'>Телефон</p>
											{isEditing ? (
												<Input
													type='tel'
													value={editForm.phone}
													onChange={e =>
														setEditForm({ ...editForm, phone: e.target.value })
													}
													placeholder='+380501234567'
													className='flex-1'
												/>
											) : (
												<div className='flex items-center space-x-2'>
													<span className='text-sm font-medium'>
														{member.phone || 'Не вказано'}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className='space-y-2'>
								<div className='bg-muted/30 rounded-lg p-4'>
									<div className='flex items-center gap-3'>
										<div className='bg-blue-100 p-2 rounded-lg'>
											<MessageCircle className='h-5 w-5 text-blue-600' />
										</div>
										<div>
											<p className='text-sm text-muted-foreground'>Telegram</p>
											{isEditing ? (
												<Input
													value={editForm.telegram}
													onChange={e =>
														setEditForm({
															...editForm,
															telegram: e.target.value,
														})
													}
													placeholder='@username'
													className='flex-1'
												/>
											) : (
												<div className='flex items-center space-x-2'>
													<span className='text-sm'>
														{member.telegram || 'Не вказано'}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value='tasks'>
				<TaskBoard memberId={member.id} />
			</TabsContent>
		</Tabs>
	)
}

export default MemberTabs
