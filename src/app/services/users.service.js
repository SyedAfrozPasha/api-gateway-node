const { Users } = require("../dataLayer/config/dbConfig");

const registerUser = async (data) => {
  try {
    return Users.create(data).save();
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(error.message);
  }
};

const getUserDetails = async (userName) => {
  try {
    return Users.findOne({ userName: userName });
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(error.message);
  }
};

module.exports = { registerUser, getUserDetails };
