require("dotenv").config();
const sequelize = require("sequelize");

const database = "heroku_21edf22ce83ccc7";
const username = "bc058ef2e0e6cd";
const password = "ab8c2877";
const host = "us-cdbr-east-06.cleardb.net";
const dialect = "mysql";

const connectionSql = new sequelize(database, username, password, {
  host,
  dialect,
});

module.exports = connectionSql;
