const multer = require("multer");
const multerConfig = require("./multer");

const uploadMultiple = multer(multerConfig).fields([
  { name: "imageOne", maxCount: 1 },
  { name: "imageTwo", maxCount: 1 },
  { name: "imageThree", maxCount: 1 },
  { name: "imageFour", maxCount: 1 },
]);

module.exports = {
  uploadMultiple,
};
