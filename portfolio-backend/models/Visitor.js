const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    // Session tracking (anonymous)
    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    // Hashed IP (GDPR compliant)
    ipHash: {
      type: String,
      required: true,
    },

    // Device info
    device: {
      browser: String,
      os: String,
      deviceType: String,
      screenSize: String,
    },

    // Location (from IP)
    location: {
      country: String,
      city: String,
      region: String,
      timezone: String,
    },

    // Page visit details
    page: {
      path: String,
      title: String,
      referrer: String,
      query: String,
    },

    // Engagement metrics
    engagement: {
      timeOnPage: { type: Number, default: 0 },
      scrollDepth: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
    },

    events: {
      type: [
        {
          type: {
            type: String,
            required: true,
          },
          target: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },

    // When this happened
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for fast queries
visitorSchema.index({ sessionId: 1, timestamp: -1 });
visitorSchema.index({ 'page.path': 1, timestamp: -1 });
visitorSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Visitor', visitorSchema);