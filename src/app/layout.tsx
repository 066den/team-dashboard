import { Metadata } from 'next'

import '@/app/globals.css'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
	title: 'Team Dashboard - Міні-дашборд команди',
	description:
		'Внутрішня система управління членами команди та їхніми завданнями',
	keywords: 'team, dashboard, tasks, management, команда, завдання',
	authors: [{ name: 'Team Dashboard' }],
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='uk' className='h-full'>
			<body className={`${inter.className} h-full antialiased`}>
				<main className='min-h-full bg-gray-50 flex flex-col justify-between'>
					<Header />
					<div className='flex-1'>{children}</div>
					<Footer />
					<Toaster richColors position='top-center' />
				</main>
			</body>
		</html>
	)
}
