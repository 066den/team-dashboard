// src/components/team/ExportButton.tsx
'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TeamMember } from '@/types'
import { exportTeamToCSV } from '@/lib/utils'
import { toast } from 'sonner'

interface ExportButtonProps {
	members: TeamMember[]
}

const ExportButton = ({ members }: ExportButtonProps) => {
	const [isExporting, setIsExporting] = useState(false)

	const handleExport = async () => {
		if (members.length === 0) {
			toast.error('Немає даних для експорту')
			return
		}

		setIsExporting(true)
		try {
			exportTeamToCSV(members)
			toast.success(`Експортовано ${members.length} співробітників`)
		} catch (error) {
			toast.error('Помилка експорту')
			console.error('Export error:', error)
		} finally {
			setIsExporting(false)
		}
	}

	return (
		<Button
			variant='outline'
			size='lg'
			onClick={handleExport}
			disabled={isExporting || members.length === 0}
			className='gap-2'
		>
			<Download className='h-4 w-4' />
			{isExporting ? 'Експорт...' : 'Експорт CSV'}
		</Button>
	)
}

export default ExportButton
