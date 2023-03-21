const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("./constants");

/**
 * Function to generate a hash from plain text
 * @param {*} plainTextPassword
 * @returns
 */
const createHash = async (plainTextPassword) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(plainTextPassword, salt);
  } catch (error) {
    console.error("Error in createHash:", error);
  }
};

/**
 * Validating the user password with stored hash and hash function
 * @param {*} password
 * @param {*} hash
 * @returns
 */
const validatePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Error in validatePassword:", error);
  }
};

module.exports = {
  createHash,
  validatePassword,
};
