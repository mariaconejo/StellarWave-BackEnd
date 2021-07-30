const express = require('express');
const playlistController = require('../controllers/playlist.controller');

const router = express.Router();

router.put('/playlist', playlistController.upsert);
router.put('/playlist/:id', playlistController.updateNamePlaylist);
router.get('/playlist/:userId', playlistController.getPlaylistByUser);
router.delete('/playlist/:userId/song/:song', playlistController.deletePlaylistMusicByUserAndSong);
router.delete('/playlist/:id', playlistController.deletePlaylistAll)

module.exports = router;
