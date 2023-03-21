// Get the Users schema from authentication
const { Users } = require("../dataLayer/config/dbConfig");

/**
 * Function to register a new user and save it in DB
 * @param {*} data
 * @returns
 */
const registerUser = async (data) => {
  try {
    return Users.create(data).save();
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(error.message);
  }
};

/**
 * Function to fetch the user detail from the DB
 * @param {*} userName
 * @returns
 */
const getUserDetails = async (userName) => {
  try {
    return Users.findOne({ userName: userName });
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(error.message);
  }
};

module.exports = { registerUser, getUserDetails };
