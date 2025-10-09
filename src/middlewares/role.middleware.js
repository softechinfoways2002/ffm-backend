// role.middleware.js
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user; // ye req.user verifyJwt middleware se aata hai
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next(); // role match hua, aage jao
    } catch (error) {
      console.error("Role middleware error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = { checkRole };
