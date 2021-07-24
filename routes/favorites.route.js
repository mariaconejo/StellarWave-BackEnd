const express = require('express');
const favoriteController = require('../controllers/favorites.controller');

const router = express.Router();

router.put('/favmusic', favoriteController.upsert);
router.get('/favmusic/:id', favoriteController.getFavorite);


module.exports = router;
