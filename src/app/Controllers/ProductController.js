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
      _id,
      productName,
      category,
      size,
      inventory,
      color,
      price,
      description,
    } = req.body;
    const data = {
      _id,
      productName: productName.toLowerCase(),
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

  readAll(req, res) {
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

  readByID(req, res) {
    Product.findById({ _id: req.params.id }, (error, data) => {
      if (error) {
        return res.status(400).json({
          error: true,
          message: "Erro ao buscar produtos.",
        });
      }
      return res.status(200).json(data);
    });
  }

  readByName(req, res) {
    const name = req.params.name;
    let regex = new RegExp(`${name.toLowerCase()}`);
    Product.find({ productName: regex }, (error, data) => {
      if (error) {
        return res.status(400).json({
          error: true,
          message: "Erro ao buscar produtos.",
        });
      }
      return res.status(200).json(data);
    });
  }

  readByCategory(req, res) {
    Product.find({ category: req.params.category }, (error, data) => {
      if (error) {
        return res.status(400).json({
          error: true,
          message: "Erro ao buscar produtos.",
        });
      }
      return res.status(200).json(data);
    });
  }

  update(req, res) {
    const {
      imageOne,
      imageTwo,
      imageThree,
      imageFour,
      productName,
      category,
      size,
      inventory,
      color,
      price,
      description,
    } = req.body;

    console.log(imageOne);

    let keyOne = imageOne;
    let keyTwo = imageTwo;
    let keyThree = imageThree;
    let keyFour = imageFour;

    if (req.files.imageOne) {
      keyOne = req.files.imageOne[0].key;
    }
    if (req.files.imageTwo) {
      keyTwo = req.files.imageTwo[0].key;
    }
    if (req.files.imageThree) {
      keyThree = req.files.imageThree[0].key;
    }
    if (req.files.imageFour) {
      keyFour = req.files.imageFour[0].key;
    }

    Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          productName: productName.toLowerCase(),
          category: category,
          size: size,
          inventory: inventory,
          color: color,
          price: price,
          description: description,
          imgs: [
            {
              _id: keyOne.split("-")[0],
              key: keyOne,
              url: `${process.env.APP_URL}/files/${keyOne}`,
            },
            {
              _id: keyTwo.split("-")[0],
              key: keyTwo,
              url: `${process.env.APP_URL}/files/${keyTwo}`,
            },
            {
              _id: keyThree.split("-")[0],
              key: keyThree,
              url: `${process.env.APP_URL}/files/${keyThree}`,
            },
            {
              _id: keyFour.split("-")[0],
              key: keyFour,
              url: `${process.env.APP_URL}/files/${keyFour}`,
            },
          ],
        },
      },
      (error, data) => {
        if (error) {
          return res.status(400).json({
            error: true,
            message: "Erro ao editar produto.",
          });
        }
        return res.status(200).json(data);
      }
    );
  }

  async delete(req, res) {
    await Product.findById(req.params.id).deleteOne();
    return res.send();
  }
}

module.exports = new ProductsController();
