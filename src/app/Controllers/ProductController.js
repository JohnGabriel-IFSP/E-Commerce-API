const mongoose = require("mongoose");
const Product = require("../Models/ProductModel");

class ProductsController {
  async create(req, res) {
    const { productName, price, description, images, category } = req.body;
    const data = {
      productName,
      price,
      description,
      images,
      category,
    };
    await Product.create(data, (error) => {
      if (error) {
        return res.status(400).json({
          error: true,
          message: "Erro ao tentar inserir produto.",
        });
      }
      return res.status(200).json({
        error: false,
        message: "Produto inserido com sucesso.",
      });
    });
  }

  read(req, res) {
    Product.find({}, (error, data) => {
      if (error) {
        return res.status(400).json({
          error: true,
          message: "Erro ao buscar produtos.",
        });
      }
      return res.status(200).json(data);
    });
  }
}

module.exports = new ProductsController();
