const Sequelize = require('sequelize')
require('dotenv').config();

const database = 'UrbanStoreDB';
const username = 'root';
const password = '323212';
const host = 'localhost';
const dialect = 'mysql';

const connection = new Sequelize(database, username, password,{
  host,
  dialect,
});

module.exports = connection
