const Router = require('express')
const routerbst = new Router()
const itemController = require('../controller/bookingstatus.controller')

routerbst.post('/item', itemController.createItem)
routerbst.get('/items', itemController.getItems)
routerbst.get('/item/:id', itemController.getOneItem)
routerbst.delete('/item/:id', itemController.deleteItem)

module.exports = routerbst