const recentService = require('../services/recent.services');

const recentController = {};

// GET METODO

// Controla lo que retona la funciona que devuelve la lista de  canciones recientes

recentController.getRecentByUser = async function (req, res, next) {
  try {
    const recent = await recentService.getRecentByUser(req.params);
    return res.status(200).json({ status: 200, data: recent, message: 'Successufully recentlist retrived' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

// PUT METODO

// Controla lo que retona la funciona que actualiza o crea la lista de recientes del usuario

recentController.upsert = async function (req, res, next) {
  try {
    const upsertRecent = await recentService.upsertRecent(req.body);
    return res.status(201).json({ status: 201, data: upsertRecent });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = recentController;
