import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Roomstatus from './pages/RoomStatus'
import BookingStatus from './pages/BookingStatus'
import RoomType from './pages/RoomType'
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
					</Routes>
				</div>
			</div>
		</>
	)
}

export default Content