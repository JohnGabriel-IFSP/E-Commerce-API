const router = require('express').Router()

//importando controller
const UserController = require('./app/Controllers/UserController')

router.post('/LoginCliente', UserController.LoginCliente)

router.post('/CadastrarCliente', UserController.CadastrarCliente)

module.exports = router
