const mongoose = require("mongoose");

const Product = mongoose.Schema(
  {
    _id: { type: String, require: true },
    productName: { type: String, require: true },
    category: { type: String, require: true },
    size: { type: String, require: true },
    inventory: { type: Number, require: true },
    color: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    imgs: [
      {
        key: { type: String, require: true },
        url: { type: String, require: true },
        _id: { type: String, require: true },
      },
    ],
  },
  {
    timestamp: true,
  }
);

Product.pre("save", function () {
  for (let i = 0; i < 4; i++) {
    if (!this.imgs[i].url) {
      this.imgs[i].url = `${process.env.APP_URL}/files/${this.imgs[i].key}`;
    }
  }
});

Product.pre("deleteOne", { query: true }, function () {
  let key = this.getQuery()["_id"];
});

module.exports = mongoose.model("product", Product);
