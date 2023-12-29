const express = require("express");
const { body } = require("express-validator");

const { loginForm, registerForm, registerUser, confirmAccount, loginUser } = require("../controllers/authController");
router = express.Router();

router.get("/register", registerForm);
router.post("/register", [
    //register
    body("userName", "Insert a valid name").trim().notEmpty().escape()
], registerUser);
router.get("/confirm/:token", confirmAccount);
router.get("/login", loginForm);
router.post("/login", loginUser)

module.exports = router;