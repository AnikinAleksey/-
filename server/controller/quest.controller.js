const db = require('../db')


class ItemController {
	async createItem(req, res) {
			const { id, surname,name,fathername,series,number,phone  } = req.body
			let item
			if (id) {
				item = await db.query('UPDATE guest set surname = $1,name= $2,fathername=$3,series=$4,number=$5,phone=$6 where id = $7 RETURNING *', [
					surname,
					name,
					fathername,
					series,
					number,
					phone,
					id
				])
			} else {
				item = await db.query('INSERT INTO guest (name, surname,fathername,series,number,phone) values ($1, $2,$3,$4,$5,$6) RETURNING *', [
					name,
					surname,
					fathername,
					series,
					number,
					phone])
			}
			res.json(item.rows[0])
	}
	async getItems(req, res) {
		const items = await db.query('SELECT * FROM guest ORDER BY id')
		res.json(items.rows)
	}
	async getOneItem(req, res) {
		const id = req.params.id
		const item = await db.query(`SELECT * FROM guest WHERE id = ${id}`)
		res.json(item.rows[0])
	}
	async deleteItem(req, res) {
	
		
		
			const id = req.params.id
			const item = await db.query(`DELETE FROM guest WHERE id = ${id}`)
			res.json({ success: true })
		} 
	
}

module.exports = new ItemController()
