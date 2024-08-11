const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Debugging line
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
