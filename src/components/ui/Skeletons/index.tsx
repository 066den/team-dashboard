import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader } from '../card'
import { Skeleton } from '../skeleton'

interface SkeletonProps {
	className?: string
	children?: React.ReactNode
	count?: number
}

export function MemberGridSkeleton({ count = 8 }: SkeletonProps) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
			{Array.from({ length: count }).map((_, i) => (
				<MemberCardSkeleton key={i} />
			))}
		</div>
	)
}

export function FiltersSkeleton() {
	return (
		<div className='flex flex-col sm:flex-row w-full gap-4'>
			<div className='relative flex-1 max-w-md'>
				<Skeleton className='h-10 w-full rounded-md' />
			</div>
			<Skeleton className='h-10 sm:w-[240px] max-w-md w-full rounded-md' />
		</div>
	)
}

export function TeamPageSkeleton() {
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='flex justify-end mb-4'>
				<Skeleton className='h-10 w-32 rounded-md' />
			</div>

			<MemberGridSkeleton />
		</div>
	)
}

export function MemberCardSkeleton({ className }: SkeletonProps) {
	return (
		<Card className={cn('animate-pulse', className)}>
			<CardContent className='px-6'>
				<div className='flex items-center gap-4'>
					<Skeleton className='h-12 w-12 rounded-full' />
					<div className='space-y-2'>
						<Skeleton className='h-5 w-32' />
						<Skeleton className='h-4 w-24' />
					</div>
				</div>
			</CardContent>
			<CardFooter className='flex justify-between items-center'>
				<Skeleton className='h-6 w-16 rounded-full' />
				<Skeleton className='h-4 w-20' />
			</CardFooter>
		</Card>
	)
}

export function MemberProfileSkeleton() {
	return (
		<div className='space-y-8'>
			<Card>
				<CardContent>
					<div className='flex lg:items-center flex-col lg:flex-row gap-4'>
						<div className='flex-1 flex items-center gap-6'>
							<div className='flex flex-col items-center gap-2'>
								<Skeleton className='h-18 w-18 rounded-full' />
								<Skeleton className='h-6 w-16 rounded-full' />
							</div>
							<div className='space-y-2'>
								<Skeleton className='h-8 w-48' />
								<Skeleton className='h-6 w-32' />
							</div>
						</div>

						<div className='bg-muted/30 rounded-lg p-4'>
							<div className='flex items-center gap-3'>
								<Skeleton className='h-9 w-9 rounded-lg' />
								<div className='space-y-2'>
									<Skeleton className='h-4 w-12' />
									<Skeleton className='h-5 w-40' />
								</div>
							</div>
						</div>
						<div className='bg-muted/30 rounded-lg p-4'>
							<div className='flex items-center gap-3'>
								<Skeleton className='h-9 w-9 rounded-lg' />
								<div className='space-y-2'>
									<Skeleton className='h-4 w-20' />
									<Skeleton className='h-5 w-24' />
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			{/* Tabs Skeleton */}
			<div className='space-y-4'>
				<div className='grid w-full grid-cols-2 bg-muted p-1 rounded-lg h-10'>
					<Skeleton className='h-8 rounded-md' />
					<Skeleton className='h-8 rounded-md' />
				</div>
			</div>
			<Card>
				<CardHeader className='justify-end'>
					<Skeleton className='h-8 w-32' />
				</CardHeader>
				<CardContent>
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='bg-muted/30 rounded-lg p-4'>
							<div className='flex items-center gap-3'>
								<Skeleton className='h-9 w-9 rounded-lg' />
								<div className='space-y-2'>
									<Skeleton className='h-4 w-12' />
									<Skeleton className='h-5 w-40' />
								</div>
							</div>
						</div>
						<div className='bg-muted/30 rounded-lg p-4'>
							<div className='flex items-center gap-3'>
								<Skeleton className='h-9 w-9 rounded-lg' />
								<div className='space-y-2'>
									<Skeleton className='h-4 w-20' />
									<Skeleton className='h-5 w-24' />
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export function MemberPageSkeleton() {
	return (
		<div className='container mx-auto'>
			<MemberProfileSkeleton />
		</div>
	)
}

export function TaskCardSkeleton() {
	return (
		<Card className='mb-3 animate-pulse'>
			<CardContent className='p-4'>
				<div className='space-y-3'>
					<div className='flex items-start justify-between'>
						<Skeleton className='h-4 w-3/4' />
						<Skeleton className='h-5 w-12 rounded-full' />
					</div>
					<Skeleton className='h-3 w-full' />
					<Skeleton className='h-3 w-2/3' />
					<div className='flex items-center justify-between'>
						<Skeleton className='h-3 w-20' />
						<Skeleton className='h-3 w-16' />
					</div>
					<div className='flex gap-1'>
						<Skeleton className='h-6 w-16' />
						<Skeleton className='h-6 w-12' />
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export function TaskColumnSkeleton({
	title,
	count = 3,
}: {
	title: string
	count?: number
}) {
	return (
		<div className='flex-1 min-h-[500px] p-4 rounded-lg border-2 bg-gray-50'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='font-semibold text-sm'>{title}</h3>
				<Skeleton className='h-5 w-8 rounded' />
			</div>
			<div className='space-y-2'>
				{Array.from({ length: count }).map((_, i) => (
					<TaskCardSkeleton key={i} />
				))}
			</div>
		</div>
	)
}

export function TaskBoardSkeleton() {
	return (
		<div className='space-y-4'>
			<Skeleton className='h-4 w-3/4' />
			<div className='grid gap-4 md:grid-cols-3'>
				<TaskColumnSkeleton title='До виконання' count={1} />
				<TaskColumnSkeleton title='В роботі' count={1} />
				<TaskColumnSkeleton title='Виконано' count={1} />
			</div>
		</div>
	)
}

export function ErrorSceleton({
	title = 'Something went wrong',
	description,
	onRetry,
	className,
}: {
	title?: string
	description?: string
	onRetry?: () => void
	className?: string
}) {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center py-12 text-center',
				className
			)}
		>
			<div className='mb-4 text-destructive'>
				<svg
					className='h-12 w-12'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
					/>
				</svg>
			</div>
			<h3 className='text-lg font-semibold text-foreground mb-2'>{title}</h3>
			{description && (
				<p className='text-sm text-muted-foreground mb-6 max-w-sm'>
					{description}
				</p>
			)}
			{onRetry && (
				<button
					onClick={onRetry}
					className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4'
				>
					Спробувати знову
				</button>
			)}
		</div>
	)
}
