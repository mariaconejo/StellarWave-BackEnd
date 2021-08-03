const express = require('express');
const favoriteController = require('../controllers/favorites.controller');

const router = express.Router();

// GET METODO

// ruta que devuelve la lista de favoritos del usuario

router.get('/favmusic/:userId', favoriteController.getFavoriteByUser);

// PUT METODO

// ruta que crea o actualiza la lista de favoritos del usuario

router.put('/favmusic', favoriteController.upsertFavorite);
// DELETE METODO

// ruta que borra canciones de la lista de favoritos del usuario

router.delete('/favmusic/:userId/song/:song', favoriteController.deleteFavoriteMusicByUserAndSong);

module.exports = router;
