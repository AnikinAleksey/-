import { Link } from 'react-router-dom'

function Header() {
	return (
		<>
			<div className='header'>
				<div className='logo'></div>
				<Link className='header-link' to={'/'}>
					Главная
				</Link>
				<Link className='header-link' to={'/Roomstatus'}>
						Статусы номеров
				</Link>
				<Link className='header-link' to={'/BookingStatus'}>
						Статусы заявок на бронирование
				</Link>
				<Link className='header-link' to={'/RoomType'}>
						Типы номеров
				</Link>
			</div>
		</>
	)
}

export default Header