const Router = require('express')
const routerstage = new Router()
const itemController = require('../controller/stage.controller')

routerstage.post('/item', itemController.createItem)
routerstage.get('/items', itemController.getItems)
routerstage.get('/item/:id', itemController.getOneItem)
routerstage.delete('/item/:id', itemController.deleteItem)

module.exports = routerstage