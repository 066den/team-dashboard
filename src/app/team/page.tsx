'use client'
import { Suspense, useMemo } from 'react'
import PageHeading from '@/components/common/PageHeading'
import TeamListGrid from '@/components/team/TeamListGrid'
import TeamListRow from '@/components/team/TeamListRow'
import { useMembers } from '@/stores/hooks/useMembers'
import { AlertCircle, GridIcon, ListIcon, Search } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card, CardContent } from '@/components/ui/card'
import TeamFilters from '@/components/team/TeamFilters'

const TeamPage = () => {
	const { viewMode, setViewMode, error, members, filter } = useMembers()
	const hasFilters = useMemo(() => {
		return Boolean(filter.search || filter.department)
	}, [filter])

	return (
		<div className='container mx-auto px-4 py-8'>
			<PageHeading title='Команда' description='Керівники та експерти'>
				<TeamFilters />
			</PageHeading>
			<div className='flex justify-end mb-4'>
				<ToggleGroup
					type='single'
					value={viewMode}
					onValueChange={(value: 'grid' | 'list') => {
						if (value) setViewMode(value)
					}}
					className='bg-muted p-1 rounded-md'
				>
					<ToggleGroupItem
						value='grid'
						aria-label='Grid view'
						className='data-[state=on]:bg-background'
					>
						<GridIcon className='h-4 w-4' />
						<span className='ml-2 hidden sm:inline'>Сетка</span>
					</ToggleGroupItem>

					<ToggleGroupItem
						value='list'
						aria-label='List view'
						className='data-[state=on]:bg-background'
					>
						<ListIcon className='h-4 w-4' />
						<span className='ml-2 hidden sm:inline'>Список</span>
					</ToggleGroupItem>
				</ToggleGroup>
			</div>
			{error ? (
				<Card className='border-destructive'>
					<CardContent className='p-8 text-center'>
						<AlertCircle className='h-12 w-12 text-destructive mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-destructive mb-2'>
							Помилка завантаження
						</h3>
						<p className='text-muted-foreground'>{error}</p>
					</CardContent>
				</Card>
			) : members && members.length === 0 && hasFilters ? (
				<Card className='fade-in'>
					<CardContent className='p-8 text-center'>
						<div className='text-muted-foreground space-y-3 flex flex-col items-center'>
							<Search className='h-12 w-12' />

							<h3 className='text-lg font-semibold'>
								{hasFilters ? 'Нікого не знайдено' : 'Немає учасників команди'}
							</h3>
							<p>
								{hasFilters
									? 'Спробуйте змінити критерії пошуку або очистити фільтри'
									: 'Учасники команди з`являться тут після додавання'}
							</p>
						</div>
					</CardContent>
				</Card>
			) : viewMode === 'grid' ? (
				<Suspense fallback={<div>Loading...</div>}>
					<TeamListGrid />
				</Suspense>
			) : (
				<Suspense fallback={<div>Loading...</div>}>
					<TeamListRow />
				</Suspense>
			)}
		</div>
	)
}

export default TeamPage
