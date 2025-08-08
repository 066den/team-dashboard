import { memo, useMemo } from 'react'

export interface IIconSvg {
	name: string
	w?: string
	h?: string
	color?: string
	fill?: string
	stroke?: string
	className?: string
	id?: string
}

const IconSvg = ({ name, className, w, h }: IIconSvg) => {
	const renderIcon = useMemo(() => {
		switch (name) {
			case 'close':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path
							stroke='#929298'
							strokeLinecap='round'
							strokeWidth='1.5'
							d='M17.781 17.968 6.594 6.781m0 11.187L17.78 6.781'
						/>
					</svg>
				)
			case 'search':
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 20 20'
						className={className}
					>
						<path d='m1.316 11.781.73-.171-.73.171Zm0-5.457.73.171-.73-.171Zm15.473 0 .73-.171-.73.171Zm0 5.457.73.171-.73-.171Zm-5.008 5.008-.171-.73.171.73Zm-5.457 0-.171.73.171-.73Zm0-15.473-.171-.73.171.73Zm5.457 0 .171-.73-.171.73ZM18.47 19.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM2.046 11.61a11.198 11.198 0 0 1 0-5.115l-1.46-.342a12.698 12.698 0 0 0 0 5.8l1.46-.343Zm14.013-5.115a11.196 11.196 0 0 1 0 5.115l1.46.342a12.698 12.698 0 0 0 0-5.8l-1.46.343Zm-4.45 9.564a11.196 11.196 0 0 1-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46ZM6.496 2.046a11.198 11.198 0 0 1 5.115 0l.342-1.46a12.698 12.698 0 0 0-5.8 0l.343 1.46Zm0 14.013a5.97 5.97 0 0 1-4.45-4.45l-1.46.343a7.47 7.47 0 0 0 5.568 5.568l.342-1.46Zm5.457 1.46a7.47 7.47 0 0 0 5.568-5.567l-1.46-.342a5.97 5.97 0 0 1-4.45 4.45l.342 1.46ZM11.61 2.046a5.97 5.97 0 0 1 4.45 4.45l1.46-.343A7.47 7.47 0 0 0 11.952.586l-.342 1.46ZM6.153.586A7.47 7.47 0 0 0 .586 6.153l1.46.342a5.97 5.97 0 0 1 4.45-4.45L6.152.586Zm8.652 15.28 3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06Z' />
					</svg>
				)
			default:
				return null
		}
	}, [className, name])

	return <i className='icon-svg'>{renderIcon}</i>
}

export default memo(IconSvg)
