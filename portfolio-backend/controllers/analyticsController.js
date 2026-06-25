const Visitor = require('../models/Visitor');

// Get dashboard summary
exports.getDashboardStats = async (req, res) => {
  try {
    console.log('📊 Fetching dashboard stats...');
    
    const totalVisitors = await Visitor.countDocuments();
    console.log('📊 Total visitors:', totalVisitors);
    
    const uniqueSessions = await Visitor.distinct('sessionId');
    const uniqueVisitors = uniqueSessions.length;
    console.log('📊 Unique visitors:', uniqueVisitors);
    
    const eventsResult = await Visitor.aggregate([
      { $unwind: '$events' },
      { $count: 'total' }
    ]);
    const totalEvents = eventsResult[0]?.total || 0;
    console.log('📊 Total events:', totalEvents);

    // Get today's visitors
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayVisitors = await Visitor.countDocuments({
      createdAt: { $gte: today }
    });

    res.json({
      totalVisitors,
      uniqueVisitors,
      totalEvents,
      todayVisitors
    });
  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get visitor data with pagination
exports.getVisitors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const visitors = await Visitor.find()
      .sort({ createdAt: -1 }) // Fixed: use createdAt instead of timestamp
      .skip(skip)
      .limit(limit);

    const total = await Visitor.countDocuments();

    res.json({
      visitors,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error('❌ Visitors error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get analytics by page
exports.getPageAnalytics = async (req, res) => {
  try {
    const analytics = await Visitor.aggregate([
      {
        $group: {
          _id: '$page.path',
          views: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' },
          avgTimeOnPage: { $avg: '$engagement.timeOnPage' },
          totalClicks: { $sum: '$engagement.clicks' }
        },
      },
      {
        $project: {
          page: { $ifNull: ['$_id', '/'] },
          views: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
          avgTimeOnPage: { $round: ['$avgTimeOnPage', 0] },
          totalClicks: 1
        },
      },
      { $sort: { views: -1 } },
    ]);

    res.json(analytics);
  } catch (error) {
    console.error('❌ Page analytics error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get daily visitor counts
exports.getDailyVisitors = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const dailyData = await Visitor.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }, // Fixed: use createdAt instead of timestamp
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
          },
          visitors: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' },
          totalTimeOnPage: { $sum: '$engagement.timeOnPage' },
          totalClicks: { $sum: '$engagement.clicks' }
        },
      },
      {
        $project: {
          date: {
            $dateFromParts: {
              year: '$_id.year',
              month: '$_id.month',
              day: '$_id.day',
            },
          },
          visitors: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
          avgTimeOnPage: { 
            $cond: [
              { $gt: ['$visitors', 0] },
              { $round: [{ $divide: ['$totalTimeOnPage', '$visitors'] }, 0] },
              0
            ]
          },
          totalClicks: 1
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.json(dailyData);
  } catch (error) {
    console.error('❌ Daily visitors error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get top projects viewed
exports.getProjectViews = async (req, res) => {
  try {
    const projectViews = await Visitor.aggregate([
      { $unwind: { path: '$events', preserveNullAndEmptyArrays: true } },
      {
        $match: {
          'events.type': 'project_view',
        },
      },
      {
        $group: {
          _id: '$events.target',
          views: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' },
          totalTimeSpent: { $sum: '$engagement.timeOnPage' }
        },
      },
      {
        $project: {
          project: { $ifNull: ['$_id', 'Unknown'] },
          views: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
          avgTimeSpent: { 
            $cond: [
              { $gt: ['$views', 0] },
              { $round: [{ $divide: ['$totalTimeSpent', '$views'] }, 0] },
              0
            ]
          }
        },
      },
      { $sort: { views: -1 } },
    ]);

    res.json(projectViews);
  } catch (error) {
    console.error('❌ Project views error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get social media clicks
exports.getSocialClicks = async (req, res) => {
  try {
    const socialData = await Visitor.aggregate([
      { $unwind: { path: '$events', preserveNullAndEmptyArrays: true } },
      {
        $match: {
          'events.type': 'social_click',
        },
      },
      {
        $group: {
          _id: '$events.target',
          clicks: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' },
          lastClick: { $max: '$events.eventDate' }
        },
      },
      {
        $project: {
          platform: { $ifNull: ['$_id', 'Unknown'] },
          clicks: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
          lastClick: 1
        },
      },
      { $sort: { clicks: -1 } },
    ]);

    res.json(socialData);
  } catch (error) {
    console.error('❌ Social clicks error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get detailed project stats (gallery, github, live demo views)
exports.getProjectDetailedStats = async (req, res) => {
  try {
    const projectStats = await Visitor.aggregate([
      { $unwind: { path: '$events', preserveNullAndEmptyArrays: true } },
      {
        $match: {
          'events.type': { 
            $in: ['project_gallery_view', 'project_github_click', 'project_live_demo_click'] 
          }
        }
      },
      {
        $group: {
          _id: {
            project: '$events.target',
            type: '$events.type'
          },
          count: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' }
        }
      },
      {
        $group: {
          _id: '$_id.project',
          galleryViews: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'project_gallery_view'] }, '$count', 0]
            }
          },
          galleryUniqueVisitors: {
            $addToSet: {
              $cond: [
                { $eq: ['$_id.type', 'project_gallery_view'] },
                '$uniqueVisitors',
                []
              ]
            }
          },
          githubClicks: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'project_github_click'] }, '$count', 0]
            }
          },
          githubUniqueVisitors: {
            $addToSet: {
              $cond: [
                { $eq: ['$_id.type', 'project_github_click'] },
                '$uniqueVisitors',
                []
              ]
            }
          },
          liveDemoClicks: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'project_live_demo_click'] }, '$count', 0]
            }
          },
          liveDemoUniqueVisitors: {
            $addToSet: {
              $cond: [
                { $eq: ['$_id.type', 'project_live_demo_click'] },
                '$uniqueVisitors',
                []
              ]
            }
          },
          totalInteractions: { $sum: '$count' }
        }
      },
      {
        $project: {
          project: '$_id',
          galleryViews: 1,
          galleryUniqueVisitors: { $size: { $arrayElemAt: ['$galleryUniqueVisitors', 0] } },
          githubClicks: 1,
          githubUniqueVisitors: { $size: { $arrayElemAt: ['$githubUniqueVisitors', 0] } },
          liveDemoClicks: 1,
          liveDemoUniqueVisitors: { $size: { $arrayElemAt: ['$liveDemoUniqueVisitors', 0] } },
          totalInteractions: 1
        }
      },
      { $sort: { totalInteractions: -1 } }
    ]);

    console.log('📊 Detailed project stats:', projectStats);
    res.json(projectStats);
  } catch (error) {
    console.error('❌ Detailed project stats error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get real-time visitors (last 5 minutes)
exports.getRealtimeVisitors = async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const realtime = await Visitor.aggregate([
      {
        $match: {
          createdAt: { $gte: fiveMinutesAgo }
        }
      },
      {
        $group: {
          _id: null,
          activeSessions: { $addToSet: '$sessionId' },
          pageViews: { $sum: 1 },
          totalClicks: { $sum: '$engagement.clicks' }
        }
      },
      {
        $project: {
          _id: 0,
          activeVisitors: { $size: '$activeSessions' },
          pageViews: 1,
          totalClicks: 1
        }
      }
    ]);

    res.json(realtime[0] || { activeVisitors: 0, pageViews: 0, totalClicks: 0 });
  } catch (error) {
    console.error('❌ Realtime visitors error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get device analytics
exports.getDeviceAnalytics = async (req, res) => {
  try {
    const deviceData = await Visitor.aggregate([
      {
        $group: {
          _id: {
            deviceType: '$device.deviceType',
            browser: '$device.browser',
            os: '$device.os'
          },
          count: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' }
        }
      },
      {
        $group: {
          _id: '$_id.deviceType',
          devices: {
            $push: {
              browser: '$_id.browser',
              os: '$_id.os',
              count: '$count',
              uniqueVisitors: { $size: '$uniqueVisitors' }
            }
          },
          totalCount: { $sum: '$count' }
        }
      },
      {
        $project: {
          deviceType: '$_id',
          devices: 1,
          totalCount: 1
        }
      },
      { $sort: { totalCount: -1 } }
    ]);

    res.json(deviceData);
  } catch (error) {
    console.error('❌ Device analytics error:', error);
    res.status(500).json({ message: error.message });
  }
};