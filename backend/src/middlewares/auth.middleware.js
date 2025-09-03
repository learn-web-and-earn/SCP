const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }


    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }    

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: true, message: "Token expired" });
    }
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }
};

const adminMiddleware = (req, res, next) => {
  try {
    
    if (req.user?.isAdmin) {
      next();
    } else {
      return res.status(403).json({ error: true, message: "Forbidden: Admin access required" });
    }
  } catch (error) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }
};

module.exports = { authMiddleware, adminMiddleware };
