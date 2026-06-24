const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getDashboardStats,
  getVisitors,
  getPageAnalytics,
  getDailyVisitors,
  getProjectViews,
  getSocialClicks,
  getProjectDetailedStats,
} = require('../controllers/analyticsController');
const router = express.Router();

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/visitors', getVisitors);
router.get('/page-analytics', getPageAnalytics);
router.get('/daily-visitors', getDailyVisitors);
router.get('/project-views', getProjectViews);
router.get('/social-clicks', getSocialClicks);
router.get('/project-detailed-stats', getProjectDetailedStats);

module.exports = router;