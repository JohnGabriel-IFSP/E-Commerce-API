const mongoose = require("mongoose");
const Product = require("../Models/ProductModel");

class ProductsController {
  async create(req, res) {
    const { file1, file2, location: url = "" } = req.files;

    const {
      productName,
      category,
      size,
      inventory,
      color,
      price,
      description,
    } = req.body;
    const data = {
      productName,
      category,
      size,
      inventory,
      color,
      price,
      description,
      imgs: [
        {
          url,
          key: file1[0].key,
          _id: file1[0].key.split("-")[0],
        },
        {
          url,
          key: file2[0].key,
          _id: file2[0].key.split("-")[0],
        },
      ],
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

  async delete(req, res) {
    await Product.findById(req.params.id).deleteOne();
    return res.send();
  }
}

module.exports = new ProductsController();
