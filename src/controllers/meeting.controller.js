const Meeting = require("../models/meeting.model");
const Client = require("../models/client.model");

// ================= CREATE MEETING =================
const createMeeting = async (req, res) => {
  try {
    const { client, manager, employee, meetingDate, latitude, longitude, status } = req.body;

    if (!client || !manager || !meetingDate || !latitude || !longitude) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check if client exists
    const clientExists = await Client.findById(client);
    if (!clientExists) {
      return res.status(404).json({ message: "Client not found" });
    }

    const meeting = await Meeting.create({
      client,
      manager,
      employee,
      meetingDate,
      latitude,
      longitude,
      status: status || "scheduled",
    });

    res.status(201).json({
      message: "Meeting created successfully",
      meeting,
    });
  } catch (error) {
    console.error("Create Meeting Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET ALL MEETINGS =================
const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("client", "name phone")
      .populate("manager", "name email role")
      .populate("employee", "name email role");
    
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Get Meetings Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET SINGLE MEETING =================
const getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findById(id)
      .populate("client", "name phone")
      .populate("manager", "name email role")
      .populate("employee", "name email role");

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).json(meeting);
  } catch (error) {
    console.error("Get Meeting Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= UPDATE MEETING =================
const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { client, manager, employee, meetingDate, latitude, longitude, status } = req.body;

    const meeting = await Meeting.findById(id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    meeting.client = client || meeting.client;
    meeting.manager = manager || meeting.manager;
    meeting.employee = employee || meeting.employee;
    meeting.meetingDate = meetingDate || meeting.meetingDate;
    meeting.latitude = latitude || meeting.latitude;
    meeting.longitude = longitude || meeting.longitude;
    meeting.status = status || meeting.status;

    await meeting.save();

    res.status(200).json({ message: "Meeting updated successfully", meeting });
  } catch (error) {
    console.error("Update Meeting Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= DELETE MEETING =================
const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findByIdAndDelete(id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Delete Meeting Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= EXPORT MODULE =================
module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
