const Router = require('express')
const routerroom = new Router()
const itemController = require('../controller/room.controller ')

routerroom.post('/item', itemController.createItem)
routerroom.get('/items', itemController.getItems)
routerroom.get('/item/:id', itemController.getOneItem)
routerroom.delete('/item/:id', itemController.deleteItem)

module.exports = routerroom