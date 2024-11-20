const crypto = require("crypto");
const passwordKey = crypto.randomBytes(32).toString("hex");

const generatePassword = (password) => {
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordKey, 10000, 64, "sha512")
    .toString("hex");
  return {
    passwordKey,
    passwordHash,
  };
};

const validatePassword = (password, passwordKey, passwordHash) => {
  const checkPasswordHash = crypto
    .pbkdf2Sync(password, passwordKey, 10000, 64, "sha512")
    .toString("hex");
  if (passwordHash.passwordHash === checkPasswordHash) {
    return true;
  } else {
    return false;
  }
};

module.exports = { generatePassword, passwordKey, validatePassword };
