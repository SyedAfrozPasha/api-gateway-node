const createHash = async (plainTextPassword) => {
  try {
    if (plainTextPassword === "password") {
      return "HASH";
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in createHash:", error);
  }
};

const validatePassword = async (password, hash) => {
  try {
    if (hash === "HASH") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in validatePassword:", error);
  }
};

module.exports = {
  createHash,
  validatePassword,
};
