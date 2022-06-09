const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("./app/Middlewares/multer");

const ProductController = require("./app/Controllers/ProductController");

const routes = new Router();

const upload = multer(multerConfig);
const uploadMultiple = upload.fields([
  { name: "imageOne", maxCount: 1 },
  { name: "imageTwo", maxCount: 1 },
  { name: "imageThree", maxCount: 1 },
  { name: "imageFour", maxCount: 1 },
]);

routes.post("/CadastrarProduto", uploadMultiple, ProductController.create);

routes.get("/Products", ProductController.read);

routes.delete("/Products/:id", ProductController.delete);

module.exports = routes;
