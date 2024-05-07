const Router = require('express')
const routerrt = new Router()
const itemController = require('../controller/roomtype.controller')

routerrt.post('/item', itemController.createItem)
routerrt.get('/items', itemController.getItems)
routerrt.get('/item/:id', itemController.getOneItem)
routerrt.delete('/item/:id', itemController.deleteItem)

module.exports = routerrt