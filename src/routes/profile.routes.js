const express = require("express");
const { verifyJwt } = require("../middlewares/auth.middleware.js");
const { getProfile } = require("../controllers/profile.controller.js");

const router = express.Router();

router.get("/", verifyJwt, getProfile);

module.exports = router;
