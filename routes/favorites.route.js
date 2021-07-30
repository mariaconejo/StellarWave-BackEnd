const express = require('express');
const favoriteController = require('../controllers/favorites.controller');

const router = express.Router();

router.put('/favmusic', favoriteController.upsertFavorite);
router.get('/favmusic/:userId', favoriteController.getFavoriteByUser);
router.delete('/favmusic/:userId/song/:song',favoriteController.deleteFavoriteMusicByUserAndSong)

module.exports = router;
