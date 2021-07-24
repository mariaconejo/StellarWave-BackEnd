const Playlist = require('../models/playlist.model');
const mongoose = require('mongoose');

const playlistService = {};


async function findUser(userId) {
    try {
      const user = Playlist.findOne({ userId: mongoose.Types.ObjectId(userId) });
      return user ? user : null;
    } catch (e) {
      throw new Error('Error while getting user');
    }
  }
  
  async function createPlaylist(userId,  listSongs, name) {
    try {
      const playlistmusic = new Playlist({ userId,  listSongs, name });
      const newPlaylistMusic = await playlistmusic.save();
      return newPlaylistMusic;
    } catch (e) {
      throw new Error('Error while save Favorite Music');
    }
  };
  
  
  async function updatePlaylistMusic(user,  listSongs) {
    try {
      user.listSongs.unshift(listSongs.toString());
      await user.save();
      return user;
    } catch (e) {
      throw new Error('Error while update Recent Music');
    }
  }
  
  
  playlistService.upsertPlaylist = async function ({ userId,  listSongs, name }) {
    try {
      const user = await findUser(userId);
      if (user) {
        return await updatePlaylistMusic(user, listSongs, name);
      }
      return await createPlaylist(userId, listSongs, name);
    } catch (e) {
      throw new Error('Error while save Recent Music');
    }
  };

  
  playlistService.getPlaylist = async function ({ id }) {
    try {
      const playlist = await Playlist.findById(id);
      return playlist;
    } catch (e) {
      throw new Error('Error while returning playlist');
    }
  };

  playlistService.deletePlaylist = async function ({ id }) {
    try {
      const playlist = await Playlist.findByIdAndRemove(id);
      return playlist;
    } catch (e) {
      throw new Error('Error while delete playlist');
    }
  };
  
module.exports = playlistService;

