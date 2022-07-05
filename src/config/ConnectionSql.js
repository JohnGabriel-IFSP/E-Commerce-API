require("dotenv").config();
const sequelize = require('sequelize');


//conexão com sql

const database = 'urbanstoredb';
const username = 'root';
const password = '323212';
const host = 'localhost';
const dialect = 'mysql';

const connectionSql = new sequelize(database, username, password,{
  host,
  dialect,
})

module.exports = connectionSql;