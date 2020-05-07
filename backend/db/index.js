const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://blog:blog@localhost:5432/blog');

module.exports = sequelize;