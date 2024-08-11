const { Signup, Login, Logout } = require("../controllers/AuthController");
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleWare");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);
router.post("/", userVerification);

module.exports = router;
