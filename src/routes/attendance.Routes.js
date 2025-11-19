const express = require("express");
const router = express.Router();

const { verifyJwt } = require("../middlewares/auth.middleware");
const attendance = require("../controllers/attendance.Controller.js");


router.post("/checkin", verifyJwt, attendance.checkIn);


router.post("/checkout", verifyJwt, attendance.checkOut);

module.exports = router;
