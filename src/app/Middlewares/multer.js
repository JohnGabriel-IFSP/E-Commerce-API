const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
  },
});

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
  production: multerS3({
    s3: s3,
    bucket: "us-storage-files",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, callback) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) callback(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        callback(null, fileName);
      });
    },
  }),
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
