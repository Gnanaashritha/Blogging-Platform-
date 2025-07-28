const express = require("express");
const { RegisterValidation, LoginValidation } = require("../middleware/auth.middleware");
const { handleSignup, handleLogin } = require("../controllers/auth.contoller");
const router = express.Router();

router.post("/signup",RegisterValidation,handleSignup);
router.post("/login",LoginValidation,handleLogin);

module.exports = router;
