const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const progressUpdateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: {
    error: 'Too many progress updates. Please watch at normal speed.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    if (req.user && req.user.userId) {
      return req.user.userId.toString();
    }
    return ipKeyGenerator(req.ip);
  }
});

const validateSession = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const videoId = parseInt(req.params.videoId, 10);
    const currentUserAgent = req.headers['user-agent'];

    const watchLog = await prisma.watchLog.findUnique({
      where: {
        userId_videoId: { userId, videoId }
      },
      select: {
        lastUserAgent: true,
        lastUpdateTime: true
      }
    });

    if (!watchLog || !watchLog.lastUpdateTime || !watchLog.lastUserAgent) {
      return next();
    }

    const isRecent = new Date(Date.now() - 45 * 1000) < watchLog.lastUpdateTime;
    const isDifferentDevice = watchLog.lastUserAgent !== currentUserAgent;

    if (isRecent && isDifferentDevice) {
      return res.status(400).json({
        error: 'Multiple devices detected. Please complete watching on one device.',
        code: 'MULTIPLE_DEVICES'
      });
    }

    next();
  } catch (error) {
    console.error('Session validation error:', error);
    next();
  }
};

const validateProgressData = (req, res, next) => {
  const {
    watchedPercentage,
    totalWatchTime,
    skipEvents,
    pauseEvents,
    isCompleted
  } = req.body;

  const errors = [];

  if (watchedPercentage !== undefined) {
    if (typeof watchedPercentage !== 'number' ||
      watchedPercentage < 0 || watchedPercentage > 100) {
      errors.push('Invalid watchedPercentage: must be a number between 0 and 100');
    }
  }

  if (totalWatchTime !== undefined) {
    if (typeof totalWatchTime !== 'number' || totalWatchTime < 0) {
      errors.push('Invalid totalWatchTime: must be a non-negative number');
    }
  }

  if (skipEvents !== undefined && !Array.isArray(skipEvents)) {
    errors.push('Invalid skipEvents: must be an array');
  }

  if (pauseEvents !== undefined && !Array.isArray(pauseEvents)) {
    errors.push('Invalid pauseEvents: must be an array');
  }

  if (Array.isArray(skipEvents)) {
    const invalidSkips = skipEvents.filter(event => {
      return !event.timestamp ||
        typeof event.from !== 'number' ||
        typeof event.to !== 'number';
    });

    if (invalidSkips.length > 0) {
      errors.push('Invalid skip event structure: missing timestamp, from, or to values');
    }
  }

  if (Array.isArray(pauseEvents)) {
    const invalidPauses = pauseEvents.filter(event => {
      return !event.timestamp || typeof event.currentTime !== 'number';
    });

    if (invalidPauses.length > 0) {
      errors.push('Invalid pause event structure: missing timestamp or currentTime');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors,
      code: 'VALIDATION_ERROR'
    });
  }

  next();
};

const videoSecurityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
};

module.exports = {
  progressUpdateLimiter,
  validateSession,
  validateProgressData,
  videoSecurityHeaders
};