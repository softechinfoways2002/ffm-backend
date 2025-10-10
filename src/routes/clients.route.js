const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientOps.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const { checkRole } = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management and operations
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.createClient
);

/**
 * @swagger
 * /api/clients/clients:
 *   get:
 *     summary: Get all clients (admin can see all, manager only their clients)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/clients",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.getAllClients
);

/**
 * @swagger
 * /api/clients/clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Client ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client details
 *       404:
 *         description: Client not found
 */
router.get(
  "/clients/:id",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.getClientById
);

/**
 * @swagger
 * /api/clients/clients/{id}:
 *   put:
 *     summary: Update client details
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Client ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found
 */
router.put(
  "/clients/:id",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.updateClient
);

/**
 * @swagger
 * /api/clients/clients/{id}:
 *   delete:
 *     summary: Delete a client (admin only)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Client ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Client not found
 */
router.delete(
  "/clients/:id",
  verifyJwt,
  checkRole(["admin"]),
  clientController.deleteClient
);

/**
 * @swagger
 * /api/clients/clients/{id}/meetings:
 *   get:
 *     summary: Get meetings of a specific client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Client ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of meetings
 *       404:
 *         description: Client or meetings not found
 */
router.get(
  "/clients/:id/meetings",
  verifyJwt,
  checkRole(["admin", "manager"]),
  clientController.getClientMeetings
);

module.exports = router;
