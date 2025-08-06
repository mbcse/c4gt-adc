require('dotenv').config();
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  // credentials: true
}));

app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const instructorRoutes = require("./routes/instructor");
const adminRoutes = require("./routes/admin");
const superadminRoutes = require("./routes/superadmin");
const videoRoutes = require('./routes/videoRoutes');
const courseRoutes = require('./routes/courseRoutes');

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superadmin", superadminRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/courses', courseRoutes);

app.use('/api/videos', (error, req, res, next) => {
  console.error('Video API Error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Invalid request data',
      details: error.message
    });
  }
  
  if (error.code === 'P2002') {
    return res.status(409).json({
      error: 'Data conflict occurred'
    });
  }
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

module.exports = app;