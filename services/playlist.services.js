const Playlist = require('../models/playlist.model');
const mongoose = require('mongoose');

const playlistService = {};


async function findUser(userId) {
    try {
      const user = Playlist.findOne({ userId: mongoose.Types.ObjectId(userId) });
      return user ? user : null;
    } catch (e) {
      console.log('Error Message', e.message)
      throw new Error('Error while getting user');
    }
  }
  
  async function createPlaylist(userId,  listSongs, name) {
    try {
      const playlistmusic = new Playlist({ userId,  listSongs, name });
      const newPlaylistMusic = await playlistmusic.save();
      return newPlaylistMusic;
    } catch (e) {
      console.log('Error Message', e.message)
      throw new Error('Error while save Favorite Music');
    }
  };
  
  
  async function updatePlaylistMusic(user,  listSongs) {
    try {
      user.listSongs.push(listSongs.toString());
      await user.save();
      return user;
    } catch (e) {
      console.log('Error Message', e.message)
      throw new Error('Error while update Recent Music');
    }
  }
  
  
  playlistService.upsertPlaylist = async function ({ userId, name,  listSongs}) {
    try {
      const user = await findUser(userId);
      if (user) {
        return await updatePlaylistMusic(user, name, listSongs);
      }else{
        return await createPlaylist(userId, name, listSongs);
      }
      
    } catch (e) {
      console.log('Error Message', e.message)
      throw new Error('Error while save Recent Music');
    }
  };

  async function deletePlaylist (user, listSongs,) {
    try {
        user.listSongs.pull(listSongs);
        user.save()
        return user;
    } catch (e) {
      
        console.log('Error Message', e.message)
        throw Error('Error while delete Favorite Music')
    }
  }

  
  playlistService.getPlaylistByUser = async function ({ userId }) {
    try {
      const playlist = await Playlist.find({userId: mongoose.Types.ObjectId(userId)});
      return playlist;
    } catch (e) {
      console.log('Error Message', e.message)
      throw new Error('Error while returning playlist');
    }
  };

  playlistService.deletePlaylistMusicByUserAndSong  = async function ({userId, song}) {
    try {
        const user = await findUser (userId) 
        if (user){
            return deletePlaylist(user, song)
        }
    } catch (e) {
        
        console.log('Error Message', e.message)
        throw Error('Error while save Favorite Music')
    }
  } 

  playlistService.deletePlaylistAll = async function ({ id }) {
    try {
      const playlist = await Playlist.findByIdAndRemove(id);
      return playlist;
    } catch (e) {
      console.log('Error Message', e.message)
      throw new Error('Error while delete playlist');
    }
  };

  playlistService.updateNamePlaylist = async function ({id},{name}) {
    try {
        const playlists = await Playlist.findById(id);
        const updateName = await playlists.set({ name });
        await updateName.save();
        return updateName;
    } catch (e) {
        console.log(e.message);
        throw Error('Error while save playist name')
    }
};
  
module.exports = playlistService;

