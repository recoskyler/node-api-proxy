import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import apiRouter from './routes/index';
import errorHandler from './middleware/error';

const PORT = !process.env.PORT || process.env.PORT.trim() === '' || isNaN(parseInt(process.env.PORT.trim()))
  ? 5000
  : process.env.PORT.trim();

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
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 100,
});

app.use(limiter);
app.set('trust proxy', 1);

// Routes
app.use('/', apiRouter);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));