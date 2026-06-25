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

    res.json({
      totalVisitors,
      uniqueVisitors,
      totalEvents,
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
      .sort({ timestamp: -1 })
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
        },
      },
      {
        $project: {
          page: { $ifNull: ['$_id', '/'] },
          views: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
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

    console.log('📊 Fetching daily data from:', startDate);

    const dailyData = await Visitor.aggregate([
      {
        $match: {
          $or: [
            { timestamp: { $gte: startDate } },
            { createdAt: { $gte: startDate } }
          ]
        },
      },
      {
        $group: {
          _id: {
            year: { $year: { $ifNull: ['$timestamp', '$createdAt'] } },
            month: { $month: { $ifNull: ['$timestamp', '$createdAt'] } },
            day: { $dayOfMonth: { $ifNull: ['$timestamp', '$createdAt'] } },
          },
          visitors: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' },
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
        },
      },
      { $sort: { date: 1 } },
    ]);

    console.log('📊 Daily data found:', dailyData.length);
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
        },
      },
      {
        $project: {
          project: { $ifNull: ['$_id', 'Unknown'] },
          views: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
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
        },
      },
      {
        $project: {
          platform: { $ifNull: ['$_id', 'Unknown'] },
          clicks: 1,
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
          count: { $sum: 1 }
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
          githubClicks: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'project_github_click'] }, '$count', 0]
            }
          },
          liveDemoClicks: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'project_live_demo_click'] }, '$count', 0]
            }
          },
          totalInteractions: { $sum: '$count' }
        }
      },
      {
        $project: {
          project: '$_id',
          galleryViews: 1,
          githubClicks: 1,
          liveDemoClicks: 1,
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