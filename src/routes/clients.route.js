const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientOps.controller"); // we'll create this later
const { verifyJwt } = require("../middlewares/auth.middleware"); // JWT authentication middleware
const { checkRole } = require("../middlewares/role.middleware"); // Role-based access middleware

// ================= CLIENT ROUTES =================

// Create a new client (only admin or manager)
router.post(
  "/",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.createClient
);

// Get all clients (admin can see all, manager can see only their clients)
router.get(
  "/clients",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.getAllClients
);

// Get a specific client by ID
router.get(
  "/clients/:id",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.getClientById
);

// Update a client (admin or manager)
router.put(
  "/clients/:id",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.updateClient
);

// Delete a client (admin only)
router.delete(
  "/clients/:id",
  verifyJwt,
  checkRole(["admin"]),
  clientController.deleteClient
);

// Optional: Get meetings of a specific client
router.get(
  "/clients/:id/meetings",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.getClientMeetings
);

module.exports = router;
