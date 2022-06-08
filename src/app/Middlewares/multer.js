const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storageType = {
  local: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(
        null,
        path.resolve(__dirname, "..", "..", "..", "tmp", "uploads")
      );
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) callback(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        callback(null, file.key);
      });
    },
  }),
  production: "",
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "..", "tmp", "uploads"),
  storage: storageType[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type!"));
    }
  },
};
