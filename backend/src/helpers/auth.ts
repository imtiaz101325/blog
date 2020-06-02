import crypto from "crypto";

export function getHash(plaintext: string, salt: string) {
  return crypto.pbkdf2Sync(plaintext, salt, 1000, 64, `sha512`).toString(`hex`);
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

export function generateHash(plaintext: string) {
  const salt = generateSalt();

  return {
    salt,
    hash: getHash(plaintext, salt),
  };
}

export const secret = process.env.JWT_SECRET || "top-secret";
