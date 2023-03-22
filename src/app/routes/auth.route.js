const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Services
const { registerUser, getUserDetails } = require("../services/auth.service");
// Utils
const { createHash, validatePassword } = require("../utils/auth.utils");
// Input validation Schema
const { schema } = require("../validationSchema/auth.schema");
// Constants
const { JWT_SECRET } = require("../utils/constants");

// Route for login
router.post("/login", async (req, res) => {
  try {
    // Validate the body with joi schema
    await schema.validateAsync(req.body);

    const { userName, password } = req.body;

    // Get the user details from the Auth service
    const user = await getUserDetails(userName);

    // Validate if user details
    if (user && user.userName) {
      // Validate the password using auth service
      const isValidPassword = await validatePassword(password, user.password);

      // If password is invalid, send the error response
      if (!isValidPassword) {
        const result = {
          isError: true,
          message: "Unauthorized",
        };

        return res.status(401).json(result);
      }

      // Generate the token using userName
      const token = jwt.sign({ userName }, JWT_SECRET, {
        expiresIn: 1000000,
      });

      const responseObj = {
        isError: false,
        message: "Login Successful!",
        userName,
        token,
      };

      res.status(200).json(responseObj);
    } else {
      const result = {
        isError: true,
        message: "Login Failed - User not found!",
      };

      return res.status(404).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      isError: true,
      message: "Failed",
    });
  }
});

// Route to register a new user with userName and password
router.post("/register", async (req, res) => {
  try {
    // Validate the body with joi schema
    await schema.validateAsync(req.body);

    const { userName, password } = req.body;

    // Create hash password using auth service
    const hashPassword = await createHash(password);

    const requestBody = {
      userName,
      password: hashPassword,
    };

    // Create a new user in DB with userName and hashed password
    await registerUser(requestBody);

    const result = {
      isError: false,
      message: "Successfully registered!",
    };

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      isError: true,
      message: "Failed",
    });
  }
});

module.exports = router;
