const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	password: '0103',
	host: 'localhost',
	port: 5432,
	database: 'Hotel'
})

module.exports = pool