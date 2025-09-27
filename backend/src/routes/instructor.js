const express = require("express");
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const requireRole = require('../middlewares/requireRole');

// get instructor's course page 
router.get("/courses", requireAuth, requireRole(["INSTRUCTOR"]), (req, res) => {
    res.json({ message: "Instructor's Course Page" });
});

module.exports = router;
