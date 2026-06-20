const Visitor = require('../models/Visitor');
const crypto = require('crypto');
const UAParser = require('ua-parser-js');

// Hash IP for privacy
const hashIP = (ip) => {
  return crypto.createHash('sha256').update(ip + process.env.IP_SALT).digest('hex');
};

// Get or create session ID
const getSessionId = (req, res) => {
  let sessionId = req.cookies?.analytics_session;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    res.cookie('analytics_session', sessionId, {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
  return sessionId;
};

// Main tracking middleware
exports.trackVisitor = async (req, res, next) => {
  // ✅ FIXED: Skip ALL API routes (not just admin/auth)
  if (req.path.startsWith('/api/')) {
    return next();
  }

  // Skip bots
  const userAgent = req.headers['user-agent'] || '';
  const botPatterns = /bot|crawler|spider|scraper|headless/i;
  if (botPatterns.test(userAgent)) {
    return next();
  }

  try {
    const sessionId = getSessionId(req, res);
    const ip = req.ip || req.connection.remoteAddress || '0.0.0.0';
    const ipHash = hashIP(ip);

    // Parse user agent
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    // Check for existing visit in last 30 seconds
    const existingVisit = await Visitor.findOne({
      sessionId,
      'page.path': req.path,
    }).sort({ timestamp: -1 }).limit(1);

    if (existingVisit) {
      const timeDiff = Date.now() - existingVisit.timestamp;
      if (timeDiff < 30000) {
        await Visitor.updateOne(
          { _id: existingVisit._id },
          {
            $inc: {
              'engagement.clicks': 1,
              'engagement.timeOnPage': 30,
            },
          }
        );
        return next();
      }
    }

    // Create new visitor record
    const visitorData = {
      sessionId,
      ipHash,
      device: {
        browser: uaResult.browser.name || 'Unknown',
        os: uaResult.os.name || 'Unknown',
        deviceType: uaResult.device.type || 'desktop',
        screenSize: req.headers['screen-size'] || 'Unknown',
      },
      location: {
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        timezone: 'Unknown',
      },
      page: {
        path: req.path,
        title: req.headers['page-title'] || 'Portfolio',
        referrer: req.headers.referer || 'direct',
        query: JSON.stringify(req.query),
      },
      engagement: {
        timeOnPage: 0,
        scrollDepth: 0,
        clicks: 0,
      },
      events: [],
      timestamp: new Date(),
    };

    await Visitor.create(visitorData);
    next();
  } catch (error) {
    console.error('Analytics error:', error);
    next(); // Don't break the app if analytics fails
  }
};

// Track specific events - FIXED with better error handling
exports.trackEvent = async (req, res) => {
  try {
    const { eventType, target } = req.body;
    const sessionId = req.cookies?.analytics_session;

    if (!sessionId) {
      return res.status(400).json({ message: 'No session found' });
    }

    // Find the latest visitor record
    let visitor = await Visitor.findOne({ sessionId }).sort({ timestamp: -1 });

    if (!visitor) {
      // Create a new visitor if none exists
      visitor = new Visitor({
        sessionId,
        ipHash: 'anonymous',
        device: { browser: 'Unknown', os: 'Unknown', deviceType: 'Unknown' },
        page: { path: req.headers.referer || '/', title: 'Unknown' },
        events: []
      });
      await visitor.save();
    }

    // Push the event using updateOne for safety
    await Visitor.updateOne(
      { _id: visitor._id },
      {
        $push: {
          events: {
            type: eventType,
            target: target,
            timestamp: new Date()
          }
        }
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Event tracking error:', error);
    res.status(500).json({ message: 'Error tracking event' });
  }
};