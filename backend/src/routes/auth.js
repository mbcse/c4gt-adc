const express=require("express");
const router=express.Router();
const {signup,login}=require("../controllers/authController");
const { signupValidation, loginValidation } = require("../middlewares/authValidation");
const { loginLimiter, signupLimiter } = require("../middlewares/rateLimiters");
const { validationResult } = require('express-validator');

// validationResult middleware
function checkValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // send first error message
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
}

router.post("/signup",signupLimiter, signupValidation, checkValidation, signup);
router.post("/login",loginLimiter, loginValidation, checkValidation, login);

module.exports=router;