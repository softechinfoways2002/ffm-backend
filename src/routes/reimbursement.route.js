const express = require("express");

const {
  createClaim,
  getEmployeeClaims,
  getAllClaims,
  updateClaimStatus,
} = require("../controllers/reimbursement.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reimbursements
 *   description: Reimbursement claim endpoints for employees and admins
 */

/**
 * @swagger
 * /api/reimbursement/create:
 *   post:
 *     summary: Create a new reimbursement claim (Employee)
 *     tags: [Reimbursements]
 *     security:
 *       - bearerAuth: []    # JWT Bearer token required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 150.75
 *               description:
 *                 type: string
 *                 example: "Taxi fare for client meeting"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-01"
 *               billImage:
 *                 type: string
 *                 description: "URL or base64 string for the bill image (optional)"
 *     responses:
 *       201:
 *         description: Claim created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 claim:
 *                   type: object
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Server error
 */
router.post("/create", verifyJwt, createClaim);

/**
 * @swagger
 * /api/reimbursement/my-claims:
 *   get:
 *     summary: Get reimbursement claims of the logged-in employee
 *     tags: [Reimbursements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token (e.g. "Bearer {token}")
 *     responses:
 *       200:
 *         description: List of employee claims
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 claims:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/my-claims", verifyJwt, getEmployeeClaims);

/**
 * @swagger
 * /api/reimbursement/all:
 *   get:
 *     summary: Get all reimbursement claims (Admin)
 *     tags: [Reimbursements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token (Admin)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional filter by status (e.g. pending, approved, rejected)
 *     responses:
 *       200:
 *         description: List of all claims (populated employee details)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 claims:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/all", verifyJwt, getAllClaims);

/**
 * @swagger
 * /api/reimbursement/update/{id}:
 *   put:
 *     summary: Update claim status and add admin remark (Admin)
 *     tags: [Reimbursements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reimbursement claim ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: 'Status value e.g. pending, approved, rejected'
 *                 example: approved
 *               adminRemark:
 *                 type: string
 *                 description: 'Remark from admin about the decision'
 *                 example: "Approved after verifying receipts."
 *     responses:
 *       200:
 *         description: Claim updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 claim:
 *                   type: object
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Claim not found
 *       500:
 *         description: Server error
 */
router.put("/update/:id", verifyJwt, updateClaimStatus);

module.exports = router;
