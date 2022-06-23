const router = require('express').Router()

const UserController = require('./app/Controllers/UserController')
const ProductController = require("./app/Controllers/ProductController");
const { uploadMultiple } = require("./app/Middlewares/multerMultiple");

router.post('/LoginCliente', UserController.LoginCliente)

router.post('/CadastrarCliente', UserController.CadastrarCliente)

router.post("/CadastrarProduto", uploadMultiple, ProductController.create);

router.get("/Products", ProductController.readAll);

router.get("/Products/:id", ProductController.readByID);

router.put("/UpdateProduct/:id", uploadMultiple, ProductController.update);

router.delete("/Products/:id", ProductController.delete);

module.exports = router
