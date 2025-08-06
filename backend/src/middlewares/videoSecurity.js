const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');

// Rate limiting for progress updates
const progressUpdateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100, // max 100 progress updates per minute per IP
  message: {
    error: 'Too many progress updates, please slow down'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // userId from decoded JWT
    if (req.user && req.user.userId) {
      return req.user.userId.toString();
    }
    return ipKeyGenerator(req.ip);
  }
});

// Rate limiting for video fetching
const videoFetchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200, // max 200 video fetch requests per minute per IP
  message: {
    error: 'Too many video requests, please wait'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Validate video progress data
const validateProgressData = (req, res, next) => {
  const { watchedPercentage, totalWatchTime, skipEvents, pauseEvents } = req.body;

  // Validate watchedPercentage
  if (watchedPercentage !== undefined) {
    if (typeof watchedPercentage !== 'number' || 
        watchedPercentage < 0 || watchedPercentage > 100) {
      return res.status(400).json({
        error: 'Invalid watchedPercentage: must be a number between 0 and 100'
      });
    }
  }

  // Validate totalWatchTime
  if (totalWatchTime !== undefined) {
    if (typeof totalWatchTime !== 'number' || totalWatchTime < 0) {
      return res.status(400).json({
        error: 'Invalid totalWatchTime: must be a non-negative number'
      });
    }
  }

  // Validate events arrays
  if (skipEvents !== undefined && !Array.isArray(skipEvents)) {
    return res.status(400).json({
      error: 'Invalid skipEvents: must be an array'
    });
  }

  if (pauseEvents !== undefined && !Array.isArray(pauseEvents)) {
    return res.status(400).json({
      error: 'Invalid pauseEvents: must be an array'
    });
  }

  next();
};

// Security headers for video endpoints
const videoSecurityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
};

module.exports = {
  progressUpdateLimiter,
  videoFetchLimiter,
  validateProgressData,
  videoSecurityHeaders
};
