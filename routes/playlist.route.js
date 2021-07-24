const express = require('express');
const playlistController = require('../controllers/playlist.controller');

const router = express.Router();

router.put('/playlist', playlistController.upsert);
router.get('/playlist/:id', playlistController.getPlaylist);
router.delete('/playlist/:id', playlistController.deletePlaylist);


module.exports = router;
