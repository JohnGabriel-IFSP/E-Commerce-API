const Product = require("../Models/ProductModel");
class ProductsController {
  async create(req, res) {
    const {
      imageOne,
      imageTwo,
      imageThree,
      imageFour,
      location: url = "",
    } = req.files;
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
          key: imageOne[0].key,
          _id: imageOne[0].key.split("-")[0],
        },
        {
          url,
          key: imageTwo[0].key,
          _id: imageTwo[0].key.split("-")[0],
        },
        {
          url,
          key: imageThree[0].key,
          _id: imageThree[0].key.split("-")[0],
        },
        {
          url,
          key: imageFour[0].key,
          _id: imageFour[0].key.split("-")[0],
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
