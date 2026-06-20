const express = require('express');
const { login, setupAdmin } = require('../controllers/authController');
const router = express.Router();

router.post('/setup', setupAdmin);
router.post('/login', login);

module.exports = router; 