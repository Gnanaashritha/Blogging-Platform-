const express = require("express");
const router = express.Router();


const { RegisterValidation, LoginValidation } = require("../middleware/auth.middleware.js");
const { handleSignup, handleLogin } = require("../controllers/auth.controller.js");


router.post("/signup", RegisterValidation, handleSignup);
router.post("/login", LoginValidation, handleLogin);

module.exports = router;
