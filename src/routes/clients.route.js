const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientOps.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const { checkRole } = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API for managing clients
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
 *               - phone
 *               - latitude
 *               - longitude
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               latitude:
 *                 type: number
 *                 example: 28.6139
 *               longitude:
 *                 type: number
 *                 example: 77.2090
 *     responses:
 *       201:
 *         description: Client created successfully
 *       400:
 *         description: Missing required fields
 */
router.post("/", verifyJwt, checkRole(["admin", "manager"]), clientController.createClient);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients
 */
router.get("/", verifyJwt, checkRole(["admin", "manager"]), clientController.getAllClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
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
router.get("/:id", verifyJwt, checkRole(["admin", "manager"]), clientController.getClientById);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update a client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
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
 *                 example: "Updated Client"
 *               phone:
 *                 type: string
 *                 example: "9876500000"
 *               latitude:
 *                 type: number
 *                 example: 28.7000
 *               longitude:
 *                 type: number
 *                 example: 77.1000
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found
 */
router.put("/:id", verifyJwt, checkRole(["admin", "manager"]), clientController.updateClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Client ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 */
router.delete("/:id", verifyJwt, checkRole(["admin"]), clientController.deleteClient);

/**
 * @swagger
 * /api/clients/{id}/meetings:
 *   get:
 *     summary: Get meetings of a client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Client ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of client meetings
 *       404:
 *         description: Client not found
 */
router.get("/:id/meetings", verifyJwt, checkRole(["admin", "manager"]), clientController.getClientMeetings);

module.exports = router;
