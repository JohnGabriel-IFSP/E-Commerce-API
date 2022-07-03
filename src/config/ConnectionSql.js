require("dotenv").config();
const sequelize = require('sequelize');


//conexão com sql

const database = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = 'mysql';

const connectionSql = new sequelize(database, username, password,{
  host,
  dialect,
})

module.exports = connectionSql;