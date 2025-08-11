import { Suspense } from 'react'
import MemberProfile from '@/components/team/MemberProfile'
import { getMember } from '@/services/mockApi'
import BackButton from '@/components/common/BackButton'
import { MemberPageSkeleton } from '@/components/ui/Skeletons'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const member = await getMember(id)

	if (!member) {
		return {
			title: 'Користувача не знайдено',
		}
	}

	return {
		title: `${member.name} - ${member.role}`,
		description: `Профіль ${member.name}, ${member.role} у департаменті ${member.department}`,
	}
}

const MemberPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params
	const member = await getMember(id)

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='mb-6'>
				<BackButton href='/team' />
			</div>

			<div className='space-y-8'>
				<Suspense fallback={<MemberPageSkeleton />}>
					<MemberProfile memberId={id} initialMember={member} />
				</Suspense>
			</div>
		</div>
	)
}

export default MemberPage
