const Visitor = require('../models/Visitor');
const crypto = require('crypto');
const UAParser = require('ua-parser-js');

// Hash IP for privacy
const hashIP = (ip) => {
  return crypto.createHash('sha256').update(ip + process.env.IP_SALT).digest('hex');
};

// Main tracking middleware
exports.trackVisitor = async (req, res, next) => {
  if (!req.path.includes('/track-event')) {
    return next();
  }

  if (req.body.eventType !== 'page_view') {
    return next(); 
  }

  // Skip bots
  const userAgent = req.headers['user-agent'] || '';
  const botPatterns = /bot|crawler|spider|scraper|headless|vercel|aws|google|bing|yandex|slurp|duckduckgo|lighthouse|postman/i;
  
  if (botPatterns.test(userAgent)) {
    return next();
  }

  try {
    const sessionId = req.body.sessionId || req.cookies?.analytics_session;
    if (!sessionId) return next();

    const ip = req.ip || req.connection.remoteAddress || '0.0.0.0';
    const ipHash = hashIP(ip);
    
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    const actualPage = req.body.target || '/';

    const existingVisit = await Visitor.findOne({
      sessionId,
      'page.path': actualPage,
    }).sort({ createdAt: -1 }).limit(1);

    if (existingVisit) {
      const timeDiff = Date.now() - existingVisit.createdAt;
      
      if (timeDiff < 1800000) {
        await Visitor.updateOne(
          { _id: existingVisit._id },
          {
            $inc: {
              'engagement.clicks': 1,
              'engagement.timeOnPage': 5,
            },
          }
        );
        req.existingVisitorId = existingVisit._id; 
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
    };

    const newVisitor = await Visitor.create(visitorData);
    req.existingVisitorId = newVisitor._id;
    next();
  } catch (error) {
    console.error('Analytics error:', error);
    next(); 
  }
};

// Track specific events
exports.trackEvent = async (req, res) => {
  try {
    const { eventType, target, sessionId: bodySessionId } = req.body;
    const sessionId = bodySessionId || req.cookies?.analytics_session;

    if (!sessionId) {
      return res.status(400).json({ message: 'No session found' });
    }

    let visitorId = req.existingVisitorId;
    
    if (!visitorId) {
      const latestVisitor = await Visitor.findOne({ sessionId }).sort({ createdAt: -1 });
      if (latestVisitor) visitorId = latestVisitor._id;
    }

    if (visitorId) {
      await Visitor.updateOne(
        { _id: visitorId },
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
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Event tracking error:', error);
    res.status(500).json({ message: 'Error tracking event' });
  }
};