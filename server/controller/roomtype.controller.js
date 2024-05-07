const db = require('../db')


class ItemController {
	async createItem(req, res) {
			const { id, name, residents } = req.body
			let item
			if (id) {
				item = await db.query('UPDATE roomtype set name = $1, residents= $2 where id = $3 RETURNING *', [
					name,
					residents,
					id	
				])
			} else {
				item = await db.query('INSERT INTO roomtype (name, residents) values ($1, $2) RETURNING *', [name,residents])
			}
			res.json(item.rows[0])
	}
	async getItems(req, res) {
		const items = await db.query('SELECT * FROM roomtype ORDER BY id')
		res.json(items.rows)
	}
	async getOneItem(req, res) {
		const id = req.params.id
		const item = await db.query(`SELECT * FROM roomtype WHERE id = ${id}`)
		res.json(item.rows[0])
	}
	async deleteItem(req, res) {
			const id = req.params.id
			const item = await db.query(`DELETE FROM roomtype WHERE id = ${id}`)
			res.json({ success: true })
		} 
	
}

module.exports = new ItemController()