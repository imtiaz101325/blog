const crypto = require("crypto");

function getHash(plaintext, salt) {
  return crypto.pbkdf2Sync(plaintext, salt, 1000, 64, `sha512`).toString(`hex`);
}

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function generateHash(plaintext) {
  const salt = generateSalt();

  return {
    salt,
    hash: getHash(plaintext, salt),
  };
}

module.exports = {
  generateHash,
  getHash,
};
