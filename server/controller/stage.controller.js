const db = require('../db')


class ItemController {
	async createItem(req, res) {
			const { id, number } = req.body
			let item
			if (id) {
				item = await db.query('UPDATE stage set number = $1 where id = $2 RETURNING *', [
					number,
					id	
				])
			} else {
				item = await db.query('INSERT INTO stage (number) values ($1) RETURNING *', [number])
			}
			res.json(item.rows[0])
	}
	async getItems(req, res) {
		const items = await db.query('SELECT * FROM stage ORDER BY id')
		res.json(items.rows)
	}
	async getOneItem(req, res) {
		const id = req.params.id
		const item = await db.query(`SELECT * FROM stage WHERE id = ${id}`)
		res.json(item.rows[0])
	}
	async deleteItem(req, res) {
	
		
		
			const id = req.params.id
			const item = await db.query(`DELETE FROM stage WHERE id = ${id}`)
			res.json({ success: true })
		} 
	
}

module.exports = new ItemController()