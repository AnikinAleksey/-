import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Roomstatus from './pages/RoomStatus'
import BookingStatus from './pages/BookingStatus'
import RoomType from './pages/RoomType'
import Quest from './pages/Quest'
import Stage from './pages/Stage'
import Room from './pages/Room'
function Content() {
	return (
		<>
			<div className='content-wrapper'>
				<div className='content'>
					<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/Roomstatus' element={<Roomstatus />} />
						<Route path='/BookingStatus' element={<BookingStatus />} />
						<Route path='/Roomtype' element={< RoomType/>} />
						<Route path='/Quest' element={< Quest/>} />
						<Route path='/Stage' element={< Stage/>} />
						<Route path='/Room' element={< Room/>} />
					</Routes>
				</div>
			</div>
		</>
	)
}

export default Content