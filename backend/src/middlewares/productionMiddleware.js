const helmet = require('helmet');
const compression = require('compression');

const productionMiddleware = (app) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'", "https:"],
          frameSrc: ["'self'", "https://www.youtube.com"]
        }
      }
    }));

    app.use(compression());
    app.disable('x-powered-by');
  }
};

module.exports = productionMiddleware;
