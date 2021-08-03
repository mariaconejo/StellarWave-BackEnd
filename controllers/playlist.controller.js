const playlistService = require('../services/playlist.services');

const playlistController = {};

// POST METODOS

// Controla lo que retona la funcion crear playlist

playlistController.createPlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.createPlaylist(req.body);
    return res.status(201).json({ status: 201, data: playlist, message: 'Successufully playlist create' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// GET METODOS

// Controla lo que retona la funcion  que devuelve todos los playlist del usuario

playlistController.getPlaylistByUser = async function (req, res, next) {
  try {
    const playlist = await playlistService.getPlaylistByUser(req.params);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successufully all playlist retrived' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

// Controla lo que retona la funcion  que devuelve un playlist en especifico

playlistController.getPlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.getPlaylist(req.params);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successfully playlist retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

// PUT METODOS

// Controla lo que retona la funcion que edita y agrega canciones

playlistController.updatePlaylistSongs = async function (req, res, next) {
  try {
    const playlist = await playlistService.updatePlaylistSongs(req.params, req.body);
    return res.status(200).json({status: 200, data: playlist, message: 'Successfully playlist news songs added' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

// Controla lo que retona la funcion  que edita el nombre del playlist

playlistController.updateNamePlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.updateNamePlaylist(req.params, req.body);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successfully name playlist updated' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// DELETE METODOS

// Controla lo que retona la funcion  que borra las canciones del playlist

playlistController.deletePlaylistSong = async function (req, res, next) {
  try {
    const playlist = await playlistService.deletePlaylistSong(req.params);
    return res.status(202).json({ status: 202, data: playlist, message: 'Song removed successfully' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Controla lo que retona la funcion  que elimina todo el playlist

playlistController.deletePlaylistAll = async function (req, res, next) {
  try {
    const playlist = await playlistService.deletePlaylistAll(req.params);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successfully deleted playlist' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = playlistController;
