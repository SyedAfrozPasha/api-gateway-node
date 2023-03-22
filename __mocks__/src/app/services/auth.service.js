const registerUser = async (data) => {
  try {
    if (data && data.userName === "userName") {
      return true;
    } else {
      throw new Error("Error");
    }
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(error.message);
  }
};

const getUserDetails = async (userName) => {
  try {
    if (userName && userName === "userName") {
      return [{ userName: "userName", password: "password" }];
    } else {
      throw new Error("Error");
    }
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    throw new Error(error.message);
  }
};

module.exports = { registerUser, getUserDetails };
