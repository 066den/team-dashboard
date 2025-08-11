'use client'
import { ErrorSceleton } from '@/components/ui/Skeletons'

export default function TeamMemberError({
	error,
	reset,
}: {
	error: Error
	reset: () => void
}) {
	return (
		<div className='container mx-auto px-4 py-8'>
			<ErrorSceleton
				title='Помилка завантаження профілю'
				description={
					error.message ||
					'Не вдалося завантажити профіль співробітника. Спробуйте пізніше.'
				}
				onRetry={reset}
			/>
		</div>
	)
}
