require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/user.route.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", routes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB Error:", err));

app.get("/", (req, res) => {
  res.send("Field Force Management Backend Running ");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
