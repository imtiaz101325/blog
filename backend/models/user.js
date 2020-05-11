"use strict";
const crypto = require("crypto");

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
      token: DataTypes.STRING,
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
          const salt = crypto.randomBytes(16).toString("hex");
          const hash = crypto
            .pbkdf2Sync(plaintext, salt, 1000, 64, `sha512`)
            .toString(`hex`);

          this.setDataValue("salt", salt);
          this.setDataValue("password", hash);
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
