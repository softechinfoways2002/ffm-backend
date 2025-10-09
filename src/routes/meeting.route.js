const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meeting.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const { checkRole } = require("../middlewares/role.middleware");

// ================= MEETING ROUTES =================

// Create a new meeting (admin or manager)
router.post(
  "/",
  verifyJwt,
  checkRole(["admin", "manager"]),
  meetingController.createMeeting
);

// Get all meetings (admin sees all, manager sees their meetings)
router.get(
  "/meetings",
  verifyJwt,
  checkRole(["admin", "manager"]),
  meetingController.getAllMeetings
);

// Get a specific meeting by ID
router.get(
  "/meetings/:id",
  verifyJwt,
  checkRole(["admin", "manager"]),
  meetingController.getMeetingById
);

// Update a meeting (admin or manager)
router.put(
  "/meetings/:id",
  verifyJwt,
  checkRole(["admin", "manager"]),
  meetingController.updateMeeting
);

// Delete a meeting (admin only)
router.delete(
  "/meetings/:id",
  verifyJwt,
  checkRole(["admin"]),
  meetingController.deleteMeeting
);

module.exports = router;
