'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { redirect, useRouter } from 'next/navigation'

type BackButtonProps = {
	href?: string
}

const BackButton = ({ href }: BackButtonProps) => {
	const router = useRouter()

	const handleClick = () => {
		if (href) {
			redirect(href)
		} else {
			router.back()
		}
	}

	return (
		<Button
			variant='ghost'
			onClick={handleClick}
			className='gap-2 text-muted-foreground cursor-pointer hover:text-foreground'
		>
			<ArrowLeft className='h-4 w-4' />
			Назад до команди
		</Button>
	)
}

export default BackButton
