import { useState } from 'react'
import IconSvg from './IconSvg'
import { Input } from './input'

type SearchInputProps = {
	value: string
	onChange: (value: string) => void
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
	const [searchValue, setSearchValue] = useState(value)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchValue(value)
		onChange(value)
	}

	return (
		<div className='relative flex-1 max-w-md'>
			<span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
				<IconSvg name='search' className='fill-gray-400' />
			</span>
			<Input
				className='pl-10 w-full'
				placeholder='Пошук по імені...'
				value={searchValue}
				onChange={handleChange}
			/>
		</div>
	)
}

export default SearchInput
