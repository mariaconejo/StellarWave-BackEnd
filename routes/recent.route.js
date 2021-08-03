const express = require('express');
const recentController = require('../controllers/recent.controller');

const router = express.Router();

// GET METODO

// ruta que devuelve la lista de canciones recientes del usuario

router.get('/rectmusic/:userId', recentController.getRecentByUser);

// PUT METODO

// ruta que actualiza o crea la lista de canciones recientes del usuario
router.put('/rectmusic', recentController.upsert);



module.exports = router;

