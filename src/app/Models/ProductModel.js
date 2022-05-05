const mongoose = require("mongoose");

const Product = mongoose.Schema(
  {
    productName: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    images: [
      {
        main: { type: String, require: true },
        imageOne: { type: String, require: true },
        imageTwo: { type: String, require: true },
        imageThree: { type: String, require: true },
        imageFour: { type: String, require: true },
      },
    ],
    category: { type: String, require: true },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("product", Product);
