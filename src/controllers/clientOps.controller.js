const Client = require("../models/client.model");
const Meeting=require("../models/meeting.model")

// ================= CREATE CLIENT =================
const createClient = async (req, res) => {
  try {
    const { name, phone, latitude, longitude } = req.body;

    if (!name || !phone || !latitude || !longitude) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const client = await Client.create({
      name,
      phone,
      latitude,
      longitude,
      createdBy: req.user._id, // logged-in user
    });

    res.status(201).json({
      message: "Client created successfully",
      client,
    });
  } catch (error) {
    console.error("Create Client Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET ALL CLIENTS =================
const getAllClients = async (req, res) => {
  try {
    let clients;
    if (req.user.role === "admin") {
      clients = await Client.find().populate("createdBy", "name email role");
    } else if (req.user.role === "manager") {
      clients = await Client.find({ createdBy: req.user._id }).populate(
        "createdBy",
        "name email role"
      );
    }

    res.status(200).json(clients);
  } catch (error) {
    console.error("Get Clients Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET SINGLE CLIENT =================
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id).populate("createdBy", "name email role");

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Get Client Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= UPDATE CLIENT =================
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, latitude, longitude } = req.body;

    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    client.name = name || client.name;
    client.phone = phone || client.phone;
    client.latitude = latitude || client.latitude;
    client.longitude = longitude || client.longitude;

    await client.save();

    res.status(200).json({ message: "Client updated successfully", client });
  } catch (error) {
    console.error("Update Client Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= DELETE CLIENT =================
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Delete Client Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET CLIENT MEETINGS =================
const getClientMeetings = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    const meetings = await Meeting.find({ client: id })
      .populate("manager", "name email")
      .populate("employee", "name email");

    res.status(200).json({ client, meetings });
  } catch (error) {
    console.error("Get Client Meetings Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===== EXPORT MODULE =====
module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  getClientMeetings,
};
