const express = require("express");
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const requireRole = require('../middlewares/requireRole');

// get superadmin settings
router.get("/settings",requireAuth, requireRole(["SUPERADMIN"]), (req,res)=>{
    res.json({message: "Superadmin settings"});
});

module.exports = router;