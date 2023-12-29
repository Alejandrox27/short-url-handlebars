const express = require("express");
const { body } = require("express-validator");

const { loginForm, registerForm, registerUser, confirmAccount, loginUser, logOutSession } = require("../controllers/authController");
router = express.Router();

router.get("/register", registerForm);
router.post("/register", [
    //register
    body("userName", "Insert a valid name").trim().notEmpty().escape(),
    body("email", "insert a valid email").trim().isEmail().normalizeEmail(),
    body("password", "Min lenght password (6)").trim().isLength({min: 6}).escape().custom((value, {req}) => {
        if(value!== req.body.repassword){
            throw new Error("The passwords don't match")
        } else{
            return value;
        }
    })
], registerUser);
router.get("/confirm/:token", confirmAccount);
router.get("/login", loginForm);
router.post("/login", [
    body("email", "insert a valid email").trim().isEmail().normalizeEmail(),
    body("password", "Min lenght password (6)").trim().isLength({min: 6}).escape()
], loginUser)

router.get("/logout", logOutSession);

module.exports = router;