const express = require("express");

const {
  createClaim,
  getEmployeeClaims,
  getAllClaims,
  updateClaimStatus,
} = require("../controllers/reimbursement.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");

const router = express.Router();

//  Employee Routes (JWT protected)
router.post("/create", verifyJwt, createClaim);
router.get("/my-claims", verifyJwt, getEmployeeClaims);

//  Admin Routes (JWT protected)
router.get("/all", verifyJwt, getAllClaims);
router.put("/update/:id", verifyJwt, updateClaimStatus);

module.exports = router;

