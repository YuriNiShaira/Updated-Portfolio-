const Visitor = require('../models/Visitor');

// Get dashboard summary
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalVisitors, uniqueVisitors, totalEvents] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.distinct('sessionId').countDocuments(),
      Visitor.aggregate([{ $unwind: '$events' }, { $count: 'total' }]),
    ]);

    res.json({
      totalVisitors,
      uniqueVisitors,
      totalEvents: totalEvents[0]?.total || 0,
    });
  } catch (error) {
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
          page: '$_id',
          views: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
        },
      },
      { $sort: { views: -1 } },
    ]);

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get daily visitor counts (for charts)
exports.getDailyVisitors = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const dailyData = await Visitor.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' },
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

    res.json(dailyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top projects viewed
exports.getProjectViews = async (req, res) => {
  try {
    const projectViews = await Visitor.aggregate([
      { $unwind: '$events' },
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
          project: '$_id',
          views: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' },
        },
      },
      { $sort: { views: -1 } },
    ]);

    res.json(projectViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get social media clicks
exports.getSocialClicks = async (req, res) => {
  try {
    const socialData = await Visitor.aggregate([
      { $unwind: '$events' },
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
          platform: '$_id',
          clicks: 1,
        },
      },
      { $sort: { clicks: -1 } },
    ]);

    res.json(socialData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};