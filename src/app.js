const express = require("express");
const authRoutes = require("./routes/auth.route");
const clientRoutes = require("./routes/clients.route");
const cookieParser = require("cookie-parser");
const meetingRoutes = require("./routes/meeting.route");
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/meetings", meetingRoutes);
module.exports = app;
