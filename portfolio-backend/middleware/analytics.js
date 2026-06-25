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
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    console.log('New session cookie set:', sessionId);
  }
  return sessionId;
};

// Main tracking middleware
exports.trackVisitor = async (req, res, next) => {
  // ALWAYS ensure session cookie exists (even for API routes)
  const sessionId = getSessionId(req, res);
  
  // Skip tracking for API routes, but cookie is already set
  if (req.path.startsWith('/api/')) {
    console.log('API route, cookie set but skipping tracking:', req.path);
    return next();
  }

  // Skip static assets
  if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|json)$/)) {
    return next();
  }

  console.log('Tracking visitor:', req.path, req.method);

  // Skip bots
  const userAgent = req.headers['user-agent'] || '';
  const botPatterns = /bot|crawler|spider|scraper|headless|vercel|aws|google|bing|yandex|slurp|duckduckgo|lighthouse|postman/i;
  
  if (botPatterns.test(userAgent)) {
    console.log('Bot detected, skipping');
    return next();
  }

  try {
    const ip = req.ip || req.connection.remoteAddress || '0.0.0.0';
    const ipHash = hashIP(ip);
    
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    const actualPage = req.path || '/';

    // Check for existing visit in last 30 seconds
    const existingVisit = await Visitor.findOne({
      sessionId,
      'page.path': actualPage,
    }).sort({ createdAt: -1 }).limit(1);

    if (existingVisit) {
      const timeDiff = Date.now() - existingVisit.createdAt;
      
      if (timeDiff < 30000) {
        await Visitor.updateOne(
          { _id: existingVisit._id },
          {
            $inc: {
              'engagement.clicks': 1,
              'engagement.timeOnPage': 5,
            },
          }
        );
        console.log('Updated existing visit');
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
        path: actualPage,
        title: req.headers['page-title'] || 'Portfolio',
        referrer: req.headers.referer || 'direct',
      },
      engagement: {
        timeOnPage: 0,
        scrollDepth: 0,
        clicks: 0,
      },
      events: [],
      timestamp: new Date(),
    };

    const newVisitor = await Visitor.create(visitorData);
    console.log('New visitor created:', newVisitor._id);
    next();
  } catch (error) {
    console.error('Analytics error:', error);
    next();
  }
};

// Track specific events - FIXED: Creates session and visitor if needed
exports.trackEvent = async (req, res) => {
  try {
    const { eventType, target } = req.body;
    let sessionId = req.cookies?.analytics_session;

    console.log('Tracking event:', { eventType, target, sessionId });

    // If no session, create one
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      res.cookie('analytics_session', sessionId, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      console.log('New session created in trackEvent:', sessionId);
    }

    // Find the latest visitor for this session
    let visitor = await Visitor.findOne({ sessionId }).sort({ createdAt: -1 });
    
    if (!visitor) {
      // Create new visitor if none exists
      visitor = new Visitor({
        sessionId,
        ipHash: 'anonymous',
        device: { browser: 'Unknown', os: 'Unknown', deviceType: 'Unknown' },
        page: { path: '/', title: 'Portfolio' },
        events: [],
        timestamp: new Date()
      });
      await visitor.save();
      console.log('New visitor created in trackEvent');
    }

    // Add event to visitor
    await Visitor.updateOne(
      { _id: visitor._id },
      {
        $push: {
          events: {
            type: eventType,
            target: target,
            eventDate: new Date()
          }
        }
      }
    );

    console.log('Event saved:', eventType, target);
    res.json({ success: true });
  } catch (error) {
    console.error('Event tracking error:', error);
    res.status(500).json({ message: 'Error tracking event' });
  }
};