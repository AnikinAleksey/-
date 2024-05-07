const db = require('../db')


class ItemController {
	async createItem(req, res) {
			const { id, name, comment } = req.body
			let item
			if (id) {
				item = await db.query('UPDATE roomstatus set name = $1, comment= $2 where id = $3 RETURNING *', [
					name,
					comment,
					id	
				])
			} else {
				item = await db.query('INSERT INTO roomstatus (name, comment) values ($1, $2) RETURNING *', [name,comment])
			}
			res.json(item.rows[0])
	}
	async getItems(req, res) {
		const items = await db.query('SELECT * FROM roomstatus ORDER BY id')
		res.json(items.rows)
	}
	async getOneItem(req, res) {
		const id = req.params.id
		const item = await db.query(`SELECT * FROM roomstatus WHERE id = ${id}`)
		res.json(item.rows[0])
	}
	async deleteItem(req, res) {
		
		
			const id = req.params.id
			const item = await db.query(`DELETE FROM roomstatus WHERE id = ${id}`)
			res.json({ success: true })
		} 
	
}

module.exports = new ItemController()