const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meeting.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const { checkRole } = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: Meeting management and operations
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
 *               - clientId
 *               - date
 *               - agenda
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: ID of the client the meeting is with
 *               date:
 *                 type: string
 *                 format: date-time
 *               agenda:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  verifyJwt,
  checkRole(["admin", "manager"]),
  meetingController.createMeeting
);

/**
 * @swagger
 * /api/meetings/meetings:
 *   get:
 *     summary: Get all meetings (admin sees all, manager sees only their meetings)
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of meetings
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/meetings",
  verifyJwt,
  checkRole(["admin", "manager"]),
  meetingController.getAllMeetings
);

/**
 * @swagger
 * /api/meetings/meetings/{id}:
 *   get:
 *     summary: Get a specific meeting by ID
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
router.get(
  "/meetings/:id",
  verifyJwt,
  checkRole(["admin", "manager"]),
  meetingController.getMeetingById
);

/**
 * @swagger
 * /api/meetings/meetings/{id}:
 *   put:
 *     summary: Update a meeting
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               date:
 *                 type: string
 *                 format: date-time
 *               agenda:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *       404:
 *         description: Meeting not found
 */
router.put(
  "/meetings/:id",
  verifyJwt,
  checkRole(["admin", "manager"]),
  meetingController.updateMeeting
);

/**
 * @swagger
 * /api/meetings/meetings/{id}:
 *   delete:
 *     summary: Delete a meeting (admin only)
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Meeting ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Meeting not found
 */
router.delete(
  "/meetings/:id",
  verifyJwt,
  checkRole(["admin"]),
  meetingController.deleteMeeting
);

module.exports = router;
