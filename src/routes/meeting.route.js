const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meeting.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const { checkRole } = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: API for managing client meetings
 */

/**
 * @swagger
 * /api/meetings:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client
 *               - manager
 *               - meetingDate
 *               - latitude
 *               - longitude
 *             properties:
 *               client:
 *                 type: string
 *                 description: Client ID
 *                 example: "652a8c6d9e9b8a7d2d1a1234"
 *               manager:
 *                 type: string
 *                 description: Manager ID
 *                 example: "652a8c6d9e9b8a7d2d1a5678"
 *               employee:
 *                 type: string
 *                 description: Employee ID (optional)
 *                 example: "652a8c6d9e9b8a7d2d1a1111"
 *               meetingDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-12T10:30:00Z"
 *               latitude:
 *                 type: number
 *                 example: 28.6139
 *               longitude:
 *                 type: number
 *                 example: 77.2090
 *               status:
 *                 type: string
 *                 enum: [scheduled, completed, cancelled]
 *                 example: "scheduled"
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *       400:
 *         description: Required fields missing
 *       404:
 *         description: Client not found
 */
router.post("/", verifyJwt, checkRole(["admin", "manager"]), meetingController.createMeeting);

/**
 * @swagger
 * /api/meetings:
 *   get:
 *     summary: Get all meetings
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of meetings
 */
router.get("/", verifyJwt, checkRole(["admin", "manager"]), meetingController.getAllMeetings);

/**
 * @swagger
 * /api/meetings/{id}:
 *   get:
 *     summary: Get a meeting by ID
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Meeting ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting details
 *       404:
 *         description: Meeting not found
 */
router.get("/:id", verifyJwt, checkRole(["admin", "manager"]), meetingController.getMeetingById);

/**
 * @swagger
 * /api/meetings/{id}:
 *   put:
 *     summary: Update a meeting
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Meeting ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 type: string
 *                 example: "652a8c6d9e9b8a7d2d1a1234"
 *               manager:
 *                 type: string
 *                 example: "652a8c6d9e9b8a7d2d1a5678"
 *               employee:
 *                 type: string
 *                 example: "652a8c6d9e9b8a7d2d1a1111"
 *               meetingDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-15T15:00:00Z"
 *               latitude:
 *                 type: number
 *                 example: 28.7041
 *               longitude:
 *                 type: number
 *                 example: 77.1025
 *               status:
 *                 type: string
 *                 enum: [scheduled, completed, cancelled]
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *       404:
 *         description: Meeting not found
 */
router.put("/:id", verifyJwt, checkRole(["admin", "manager"]), meetingController.updateMeeting);

/**
 * @swagger
 * /api/meetings/{id}:
 *   delete:
 *     summary: Delete a meeting
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Meeting ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 *       404:
 *         description: Meeting not found
 */
router.delete("/:id", verifyJwt, checkRole(["admin"]), meetingController.deleteMeeting);

module.exports = router;
