"use strict";

const { generateHash } = require("../helpers/auth");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      about: DataTypes.TEXT,
      lastLogin: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: ["active", "inactive"],
        defaultValue: "inactive",
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAuthor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      token: DataTypes.STRING(1024),
      expiresAt: DataTypes.DATE,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      salt: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(plaintext) {
          const { salt, hash } = generateHash(plaintext);

          this.setDataValue("salt", salt);
          this.setDataValue("password", hash);
        },
      },
      role: {
        type: DataTypes.VIRTUAL,
        get() {
          const isAdmin = this.getDataValue("isAdmin");
          const isAuthor = this.getDataValue("isAuthor");

          if (isAdmin) {
            return "admin";
          }

          if (isAuthor) {
            return "author";
          }

          return "user";
        },
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
