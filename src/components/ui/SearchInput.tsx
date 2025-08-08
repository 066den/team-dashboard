import IconSvg from './IconSvg'
import { Input } from './input'

const SearchInput = () => {
	return (
		<div className='relative flex-1 max-w-md'>
			<span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
				<IconSvg name='search' className='fill-gray-400' />
			</span>
			<Input className='pl-10' placeholder='Пошук по імені...' />
		</div>
	)
}

export default SearchInput
