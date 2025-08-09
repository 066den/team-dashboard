import { cn } from '@/lib/utils'

type PageHeadingProps = {
	title: string
	description?: string
	children?: React.ReactNode
	className?: string
}

const PageHeading = ({
	title,
	description,
	children,
	className,
}: PageHeadingProps) => {
	return (
		<div
			className={cn(
				'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8',
				className
			)}
		>
			<div className='space-y-2'>
				<h1 className='text-3xl font-bold tracking-tight text-primary'>
					{title}
				</h1>
				{description && (
					<p className='text-lg text-muted-foreground max-w-2xl'>
						{description}
					</p>
				)}
			</div>
			{children && (
				<div className='flex items-center space-x-2'>{children}</div>
			)}
		</div>
	)
}

export default PageHeading
