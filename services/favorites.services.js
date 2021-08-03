const mongoose = require('mongoose');
const FavoriteMusic = require('../models/favorite.model');

const favoritesService = {};

// GET METODOS

// funcion que devuelve la lista de favoritos por medio del ID del usuario

favoritesService.getFavoriteByUser = async function ({ userId }) {
  try {
    const favorites = await FavoriteMusic.find({ userId: mongoose.Types.ObjectId(userId) });
    return favorites;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while returning favorites');
  }
};

// PUT METODOS

// funcion que busca a los usuarios por medio del id del usuario

async function findUser(userId) {
  try {
    const user = FavoriteMusic.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while getting user');
  }
}

// funcion que crea lista de favoritos por medio del id del usuario

async function createFavorite(userId, listSongs) {
  try {
    const favoritemusic = new FavoriteMusic({ userId, listSongs });
    const newFavoriteMusic = await favoritemusic.save();
    return newFavoriteMusic;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while save Favorite Music');
  }
}

// funcion que actualiza la lista de favoritos

async function updateFavoriteMusic(user, listSongs) {
  try {
    listSongs.forEach((songs) => {
      if (user.listSongs.indexOf(songs) === -1) {
        user.listSongs.push(songs);
      }
    });
    await user.save();
    return user;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while update Favorite Music');
  }
}

// funcion que dependiendo si existe o no crea la lista o actualiza sus canciones

favoritesService.upsertFavorite = async function ({ userId, listSongs }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return await updateFavoriteMusic(user, listSongs);
    }
    return await createFavorite(userId, listSongs);
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while save Favorite Music');
  }
};

// DELETE METODOS

// funcion que remueve las canciones

async function deleteFavoriteMusic(user, listSongs) {
  try {
    user.listSongs.pull(listSongs);
    user.save();
    return user;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while delete Favorite Music');
  }
}

// funcion que remueve canciones de la lista de favoritos del usuario

favoritesService.deleteFavoriteMusicByUserAndSong = async function ({ userId, song }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return deleteFavoriteMusic(user, song);
    }
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while save Favorite Music');
  }
};

module.exports = favoritesService;
