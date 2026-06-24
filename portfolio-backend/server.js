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
  'https://portfolioniyurisho.vercel.app'
];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Analytics tracking middleware (applied to all routes)
app.use(trackVisitor);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Event tracking endpoint
app.post('/api/track-event', trackEvent);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Analytics tracking active`);
});