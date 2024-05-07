const express = require('express')
const cookieParser = require('cookie-parser')
const RoomStatus = require('./routes/roomstatus.routes')
const BookingStatus = require('./routes/bookingstatus.routes')
const RoomType = require('./routes/roomtype.routes')
const cors = require('cors')
const PORT = 3001
const app = express()

const corsConfig = {
	credentials: true,
	origin: true
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsConfig))
app.use('/apirst', RoomStatus)
app.use('/apibst', BookingStatus)
app.use('/apirt', RoomType)
app.listen(PORT, () => console.log('server started on port ' + PORT))

