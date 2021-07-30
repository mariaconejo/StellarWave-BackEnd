const express = require('express');
const recentController = require('../controllers/recent.controller');

const router = express.Router();

router.put('/rectmusic', recentController.upsert);
router.get('/rectmusic/:userId', recentController.getRecentByUser);


module.exports = router;

