import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
	return (
		<div className='container mx-auto py-12 px-4'>
			<div className='text-center mb-12'>
				<h1 className='text-4xl font-bold tracking-tight mb-4'>
					Team Dashboard
				</h1>
				<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
					Сучасна платформа для управління командою та завданнями. Відстежуйте
					прогрес, керуйте членами команди та оптимізуйте робочі процеси.
				</p>
			</div>

			<Card className='bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20'>
				<CardContent className='pt-8 pb-8'>
					<div className='text-center'>
						<h2 className='text-2xl font-bold mb-4'>Готові почати?</h2>
						<p className='text-muted-foreground mb-6 max-w-lg mx-auto'>
							Перегляньте команду, керуйте завданнями та відстежуйте прогрес за
							допомогою нашого інтуїтивного інтерфейсу.
						</p>
						<h2 className='text-2xl font-bold mb-4'>Виберіть роль</h2>
						<div className='flex gap-4 justify-center items-center'>
							<Button size='lg' asChild>
								<Link href='/team'>
									Я адміністратор
									<ArrowRight className='ml-2 h-4 w-4' />
								</Link>
							</Button>
							<Button size='lg' asChild>
								<Link href='/team'>
									Я користувач
									<ArrowRight className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className='mt-16 text-center'>
				<h3 className='text-lg font-semibold mb-4 text-muted-foreground'>
					Створено з використанням сучасних технологій
				</h3>
				<div className='flex flex-wrap justify-center gap-4 text-sm text-muted-foreground'>
					<span className='px-3 py-1 bg-muted rounded-full'>React 19</span>
					<span className='px-3 py-1 bg-muted rounded-full'>Next.js 15</span>
					<span className='px-3 py-1 bg-muted rounded-full'>TypeScript</span>
					<span className='px-3 py-1 bg-muted rounded-full'>Zustand</span>
					<span className='px-3 py-1 bg-muted rounded-full'>shadcn/ui</span>
					<span className='px-3 py-1 bg-muted rounded-full'>Tailwind CSS</span>
				</div>
			</div>
		</div>
	)
}
