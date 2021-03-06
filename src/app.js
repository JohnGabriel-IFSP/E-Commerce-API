require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes");
require("./config/Connection");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
    this.app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Origin",
        "https://e-commerce-eight-amber.vercel.app"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Access, Content-type, Authorization, Acept, Origin, X-Requested-With"
      );
      res.header("Content-type");
      this.app.use(cors());
      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
