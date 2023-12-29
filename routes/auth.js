const express = require("express");
const { loginForm, registerForm, registerUser, confirmAccount, loginUser } = require("../controllers/authController");
router = express.Router();

router.get("/register", registerForm);
router.post("/register", registerUser);
router.get("/confirm/:token", confirmAccount);
router.get("/login", loginForm);
router.post("/login", loginUser)

module.exports = router;