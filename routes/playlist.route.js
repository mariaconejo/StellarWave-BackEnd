const express = require('express');
const playlistController = require('../controllers/playlist.controller');

const router = express.Router();

// POST

// ruta que me crea los playlist

router.post('/playlist', playlistController.createPlaylist);

// GET

// ruta que devuelve todos los playlist del usuario

router.get('/playlists/:userId', playlistController.getPlaylistByUser);

// ruta que devuelve un playlist en especifico por medio del id

router.get('/playlist/:id', playlistController.getPlaylist);

// PUT

// ruta que edita el nombre de un playlist

router.put('/playlist_name/:id', playlistController.updateNamePlaylist);

// ruta que edita las canciones de un playlist y agrega nuevas canciones

router.put('/playlist/:id', playlistController.updatePlaylistSongs);

// DELETE

// ruta que borra canciones del playlist

router.delete('/playlist/:id/song/:song', playlistController.deletePlaylistSong);

// ruta que borra todo el playlist

router.delete('/playlist/:id', playlistController.deletePlaylistAll);

module.exports = router;
