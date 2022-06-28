const { Router } = require("express");
const ProductController = require("./app/Controllers/ProductController");
const { uploadMultiple } = require("./app/Middlewares/multerMultiple");

const routes = new Router();

routes.post("/CadastrarProduto", uploadMultiple, ProductController.create);

routes.get("/Products", ProductController.readAll);

routes.get("/Products/:id", ProductController.readByID);

routes.get("/Products/searchByName/:name", ProductController.readByName);

routes.get(
  "/Products/searchByCategory/:category",
  ProductController.readByCategory
);

routes.put("/UpdateProduct/:id", uploadMultiple, ProductController.update);

routes.delete("/Products/:id", ProductController.delete);

module.exports = routes;
