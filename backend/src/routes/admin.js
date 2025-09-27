const express = require("express");
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const requireRole = require('../middlewares/requireRole');
const prisma = require("../../generated/prisma");

// get admin dashboard
router.get("/dashboard",requireAuth, requireRole(["ADMIN", "SUPERADMIN"]), (req,res)=>{
    res.json({message: "Welcome to Admin Dashboard!"});
});

module.exports = router;