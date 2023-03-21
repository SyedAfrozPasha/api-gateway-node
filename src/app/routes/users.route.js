const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
// const passport = require("passport");

const { JWT_SECRET } = require("../utils/constants");

const { registerUser, getUserDetails } = require("../services/users.service");

router.post("/login", async (req, res) => {
  try {
    const { userName } = req.body;
    console.log("userName:", userName);
    const user = await getUserDetails(userName);
    console.log("user:", user);

    if (user && user.userName) {
      const token = jwt.sign({ userName }, JWT_SECRET, {
        expiresIn: 1000000,
      });
      console.log("token:", token);
      const userToReturn = { ...user, ...{ token } };
      delete userToReturn.password;
      delete userToReturn._id;
      res.status(200).json(userToReturn);
    } else {
      const result = {
        isError: true,
        message: "Login Failed",
      };

      res.status(401).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isError: true,
      message: "Failed",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    await registerUser(req.body);

    const result = {
      isError: false,
      message: "Success",
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isError: true,
      message: "Failed",
    });
  }
});

module.exports = router;
