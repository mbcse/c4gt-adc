// routes/analytics.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();


router.use(requireAuth);


router.post('/event', async (req, res) => {
  try {
    // Save analytics to DB
    const { eventType, videoId, userId, ...data } = req.body;
    await prisma.analyticsEvent.create({
      data: {
        userId: req.user.userId,
        videoId,
        eventType,
        data,
        timestamp: new Date(),
      },
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Error logging analytics event", err);
    res.status(500).json({ error: 'Failed to log analytics event' });
  }
});


module.exports = router;