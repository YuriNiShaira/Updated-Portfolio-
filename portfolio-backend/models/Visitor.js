const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    // Session tracking (anonymous)
    sessionId: {
      type: String,
      required: true,
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
          eventDate: { 
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    
  },
  {
    timestamps: true, 
  }
);

// ==========================================
// INDEXING STRATEGY
// ==========================================

visitorSchema.index({ sessionId: 1, createdAt: -1 });
visitorSchema.index({ 'page.path': 1, createdAt: -1 });
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ createdAt: 1 }, { expireAfterSeconds: 31536000 });

module.exports = mongoose.model('Visitor', visitorSchema);