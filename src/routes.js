const router = require('express').Router()

//importando controller
const UserController = require('./app/Controllers/UserController')
const { Router } = require("express");
const ProductController = require("./app/Controllers/ProductController");
const { uploadMultiple } = require("./app/Middlewares/multerMultiple");

router.post('/LoginCliente', UserController.LoginCliente)

router.post('/CadastrarCliente', UserController.CadastrarCliente)

module.exports = router
routes.post("/CadastrarProduto", uploadMultiple, ProductController.create);

routes.get("/Products", ProductController.readAll);

routes.get("/Products/:id", ProductController.readByID);

routes.put("/UpdateProduct/:id", uploadMultiple, ProductController.update);

routes.delete("/Products/:id", ProductController.delete);

module.exports = routes;
