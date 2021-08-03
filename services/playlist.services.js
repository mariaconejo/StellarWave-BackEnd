const mongoose = require('mongoose');
const Playlist = require('../models/playlist.model');

const playlistService = {};

// POST METODOS

// Funcion que crea un playlist

playlistService.createPlaylist = async function ({ userId, listSongs, name }) {
  try {
    const playlistmusic = new Playlist({ userId, listSongs, name });
    const newPlaylistMusic = await playlistmusic.save();
    return newPlaylistMusic;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while save Playlist Music');
  }
};

// GET METODOS

// Funcion que me devuelve  todos los playlist por usuario por medio del ID del usuario

playlistService.getPlaylistByUser = async function ({ userId }) {
  try {
    const playlist = await Playlist.find({ userId: mongoose.Types.ObjectId(userId) });
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while returning playlists');
  }
};

//  Funcion que me  devuelve un playlist en especifico por medio del ID del playlist

playlistService.getPlaylist = async function ({ id }) {
  try {
    const playlist = await Playlist.findById(id);
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while getting playlist');
  }
};

// PUT METODOS

// Edita y salva los cambios en los playlist del usuario por medio del id del playlist

playlistService.updatePlaylistSongs = async function ({ id }, { listSongs }) {
  try {
    const playlists = await Playlist.findById(id);
    listSongs.forEach((songs) => {
      if (playlists.listSongs.indexOf(songs) === -1) {
        playlists.listSongs.push(songs);
      }
    });
    await playlists.save();
    return playlists;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while update playlist song');
  }
};

// Edita el nombre del playlist por medio del ID del playlist

playlistService.updateNamePlaylist = async function ({ id }, { name }) {
  try {
    const playlists = await Playlist.findById(id);
    const updateName = await playlists.set({ name });
    await updateName.save();
    return updateName;
  } catch (e) {
    console.log(e.message);
    throw Error('Error while save playist name');
  }
};

// DELETE METODOS

// Funcion que borra las canciones del playlist una a una por medio del ID del playlist

playlistService.deletePlaylistSong = async function ({ id, song }) {
  try {
    const playlist = await Playlist.findById(id);
    playlist.listSongs.pull(song);
    playlist.save();
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while delete song ');
  }
};

// Funcion que borra todo el playlist por medio del ID

playlistService.deletePlaylistAll = async function ({ id }) {
  try {
    const playlist = await Playlist.findByIdAndRemove(id);
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while delete playlist');
  }
};

module.exports = playlistService;
