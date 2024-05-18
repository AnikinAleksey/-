const db = require('../db')


class ItemController {
	async createItem(req, res) {
			const { id, stage_id,roomstatus_id,number,roomtype_id} = req.body
			let item
			if (id) {
				item = await db.query('UPDATE room set stage_id = $1,roomstatus_id= $2,number=$3,roomtype_id=$4 where id = $5 RETURNING *', [
					stage_id,
					roomstatus_id,
					number,
					roomtype_id,
					id
				])
			} else {
				item = await db.query('INSERT INTO room (stage_id,roomstatus_id,number,roomtype_id) values ($1, $2,$3,$4) RETURNING *', [
					stage_id,roomstatus_id,number,roomtype_id])
			}
			res.json(item.rows[0])
	}
	async getItems(req, res) {
		const items = await db.query('Select * from room Order by id')
		res.json(items.rows)
	}
	async getOneItem(req, res) {
		const id = req.params.id
		const item = await db.query(`SELECT * FROM room WHERE id = ${id}`)
		res.json(item.rows[0])
	}
	async deleteItem(req, res) {
			const id = req.params.id
			const item = await db.query(`DELETE FROM room WHERE id = ${id}`)
			res.json({ success: true })
		} 
	
	
}


module.exports = new ItemController()
