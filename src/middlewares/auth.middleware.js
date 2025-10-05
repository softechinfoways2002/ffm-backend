const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const verifyJwt = async (req, res, next) => {
  try {
   
    let token = null;

    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.replace("Bearer ", "");
      }
    }

    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

    // Find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid user" });
    }

   
    req.user = user;
    next();

  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyJwt };
