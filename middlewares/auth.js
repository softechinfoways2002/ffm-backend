const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const verifyJwt = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ message:"Unauthorized: Invalid user" });
    }
    req.user = user; 
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({ message:"FInvalid or expired token"});
  }
};
module.exports = {verifyJwt};
