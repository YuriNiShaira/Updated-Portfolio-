const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { trackVisitor, trackEvent } = require('./middleware/analytics');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.set('trust proxy', true);

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://portfolioniyurisho.vercel.app'
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        if (process.env.NODE_ENV === 'development') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (remove in production)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  if (req.path.includes('/auth/login')) {
    console.log('Login attempt from:', req.ip);
  }
  next();
});

// Analytics tracking middleware (skip admin routes)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth') || req.path.startsWith('/admin')) {
    return next();
  }
  trackVisitor(req, res, next);
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Event tracking endpoint
app.post('/api/track-event', trackEvent);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  const errorResponse = {
    message: err.message || 'Internal Server Error',
  };
  
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(err.status || 500).json(errorResponse);
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.path);
  res.status(404).json({
    message: `Route ${req.path} not found`,
    method: req.method
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Analytics tracking active`);
  console.log(`CORS enabled for:`, allowedOrigins);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});