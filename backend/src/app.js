require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.set('trust proxy', 1);

const adminRoutes = require('./routes/admin/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const videoRoutes = require('./routes/videoRoutes');
const courseRoutes = require('./routes/courseRoutes');
const metadataRoutes = require('./routes/metadata');
const analyticsRoutes = require('./routes/analytics');
const quizRoutes = require('./routes/quizRoutes');

app.use(cors({
  origin: [`${process.env.CORS_ORIGIN}`, 'http://localhost:8080'],
  credentials: true
}));

app.use(helmet());
app.use(express.json({ limit: '5mb' }));

// Admin routes
app.use('/api/admin', adminRoutes);

// Other API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/metadata', metadataRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/quizzes', quizRoutes);


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// centralised error handling
app.use((err, req, res, next) => {
  console.error(`Error in ${req.method} ${req.originalUrl}:`, err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Invalid request data',
      details: err.message
    });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Data conflict occurred'
    });
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

module.exports = app;
