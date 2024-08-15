// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const User = require("../models/User");

// // Register route
// router.post("/register", async (req, res) => {
//   try {
//     const { role, email, password } = req.body;
//     const user = new User({ role, email, password });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Login route
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(400).json({ message: info.message });

//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       res.json({ message: "Logged in successfully!", user });
//     });
//   })(req, res, next);
// });

// // Logout route
// router.post("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) return res.status(400).json({ error: err.message });
//     res.json({ message: "Logged out successfully!" });
//   });
// });

// module.exports = router;
