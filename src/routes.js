const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("./app/Middlewares/multer");

const ProductController = require("./app/Controllers/ProductController");

const routes = new Router();

const upload = multer(multerConfig);
const uploadMultiple = upload.fields([
  { name: "file1", maxCount: 10 },
  { name: "file2", maxCount: 10 },
]);

routes.post("/CadastrarProduto", uploadMultiple, ProductController.create);

routes.get("/Products", ProductController.read);

routes.delete("/Products/:id", ProductController.delete);

module.exports = routes;
