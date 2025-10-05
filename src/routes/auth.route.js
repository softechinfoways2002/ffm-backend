const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controller"); // old simple way

// REGISTER ROUTE
router.post("/register", userController.registerUser);

// LOGIN ROUTE
router.post("/login", userController.loginUser);

// LOGOUT ROUTE
router.post("/logout", userController.logoutUser);

module.exports = router;
