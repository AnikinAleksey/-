const Router = require('express')
const routerquest = new Router()
const itemController = require('../controller/quest.controller')

routerquest.post('/item', itemController.createItem)
routerquest.get('/items', itemController.getItems)
routerquest.get('/item/:id', itemController.getOneItem)
routerquest.delete('/item/:id', itemController.deleteItem)

module.exports = routerquest