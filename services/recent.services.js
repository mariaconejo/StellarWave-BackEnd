const mongoose = require('mongoose');
const RecentMusic = require('../models/recent.model');

const recentService = {};

// GET METODO

// funcion que devuelve la lista de canciones recientes del usuario por medio de su ID

recentService.getRecentByUser = async function ({ userId }) {
  try {
    const recentmusic = await RecentMusic.find({ userId: mongoose.Types.ObjectId(userId) });
    return recentmusic;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while returning recentmusic');
  }
};

// PUT METODO

// funcion que busca a los usuarios por medio del id del usuario

async function findUser(userId) {
  try {
    const user = RecentMusic.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while getting user');
  }
}

// funcion que crea lista de recientes por medio del id del usuario

async function createRecent(userId, listSongs) {
  try {
    const recentmusic = new RecentMusic({ userId, listSongs });
    const newRecentMusic = await recentmusic.save();
    return newRecentMusic;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while save Favorite Music');
  }
}

// funcion que actualiza la lista de recientes se usa unshift para agregar de primero

async function updateRecentMusic(user, listSongs) {
  try {
    listSongs.forEach((songs) => {
      user.listSongs.unshift(songs);
    });

    await user.save();
    return user;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while update Recent Music');
  }
}

// funcion que dependiendo si existe o no crea la lista o actualiza sus canciones

recentService.upsertRecent = async function ({ userId, listSongs }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return await updateRecentMusic(user, listSongs);
    }
    return await createRecent(userId, listSongs);
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while save Recent Music');
  }
};

module.exports = recentService;
