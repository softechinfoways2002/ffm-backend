const express = require("express");
const authRoutes = require("./routes/auth.route");
const clientRoutes = require("./routes/clients.route");
const meetingRoutes = require("./routes/meeting.route");
const reimbursementRoutes = require("./routes/reimbursement.route");
const cookieParser = require("cookie-parser");
const swaggerDocs = require("./swagger");

const app = express();
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/reimbursements", reimbursementRoutes);

// Swagger Docs
swaggerDocs(app);

module.exports = app;
