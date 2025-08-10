import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
	className?: string
	children?: React.ReactNode
}

export function LoadingSkeleton({ className, children }: LoadingSkeletonProps) {
	return (
		<div className={cn('animate-pulse-bg rounded-md', className)}>
			{children}
		</div>
	)
}
