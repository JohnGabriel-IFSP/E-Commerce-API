const { Router } = require("express");
const ProductController = require("./app/Controllers/ProductController");
const UserController = require("./app/Controllers/UserController");
const { uploadMultiple } = require("./app/Middlewares/multerMultiple");

const routes = new Router();

routes.get("/", function (req, res, next) {
  res.status(200).send({
    title: "Api E-commerce UrbanStore",
    version: "0.0.1",
  });
});

routes.post("/LoginCliente", UserController.LoginClient);

routes.post("/CadastrarCliente", UserController.CadastarCliente);

routes.get("/InfoUser/:username", UserController.InfoClient);

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
