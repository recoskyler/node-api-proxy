import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import apiRouter from './routes/index.js';
import errorHandler from './middleware/error.js';
import auth from './middleware/auth.js';

const PORT = !process.env.PORT || process.env.PORT.trim() === '' || isNaN(parseInt(process.env.PORT.trim()))
  ? 5000
  : parseInt(process.env.PORT.trim());

const HOST = !process.env.HOST || process.env.HOST.trim() === '' || isNaN(parseInt(process.env.HOST.trim()))
  ? '127.0.0.1'
  : process.env.HOST.trim();

if (!process.env.API_KEY || process.env.API_KEY.trim() === '') {
  throw new Error('API_KEY is not set');
}

if (!process.env.API_BASE_URL || process.env.API_BASE_URL.trim() === '') {
  throw new Error('API_BASE_URL is not set');
}

if (!process.env.AUTH_TOKEN || process.env.AUTH_TOKEN.trim() === '') {
  throw new Error('AUTH_TOKEN is not set');
}

if (!process.env.API_KEY_QUERY_PARAM || process.env.API_KEY_QUERY_PARAM.trim() === '') {
  throw new Error('API_KEY_QUERY_PARAM is not set');
}

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 1000, // 1 Second
  max: 3,
});

app.use(limiter);
app.set('trust proxy', 1);

// Routes
app.use( '/*', auth, apiRouter );

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, HOST, () => console.log(`Proxy server running on host ${HOST} and port ${PORT}`));
