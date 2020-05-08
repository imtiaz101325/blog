'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      about: {
        type: Sequelize.TEXT
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'inactive'],
        defaultValue: 'inactive'
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isAuthor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      token: {
        type: Sequelize.STRING
      },
      expiresAt: {
        type: Sequelize.DATE
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      salt: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};