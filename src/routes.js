const { Router } = require("express");

const ProductController = require("./app/Controllers/ProductController");

const routes = new Router();

routes.post("/CadastrarProduto", ProductController.create);

routes.get("/Products", ProductController.read);

module.exports = routes;
