const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewares/AuthMiddleWare");

// Example protected route
router.get("/profile", verifyToken, (req, res) => {
  // The middleware already sends the response with user details if authenticated
});

module.exports = router;
