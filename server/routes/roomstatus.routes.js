const Router = require('express')
const routerrst = new Router()
const itemController = require('../controller/roomstatus.controller')

routerrst.post('/item', itemController.createItem)
routerrst.get('/items', itemController.getItems)
routerrst.get('/item/:id', itemController.getOneItem)
routerrst.delete('/item/:id', itemController.deleteItem)

module.exports = routerrst