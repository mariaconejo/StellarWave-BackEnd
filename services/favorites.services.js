const mongoose = require('mongoose');
const FavoriteMusic = require('../models/favorite.model');

const favoritesService = {};

async function findUser(userId) {
  try {
    const user = FavoriteMusic.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user ? user : null;
  } catch (e) {
    throw new Error('Error while getting user');
  }
}

async function createFavorite (userId,  listSongs) {
  try {
    const favoritemusic = new FavoriteMusic({ userId,  listSongs });
    const newFavoriteMusic = await favoritemusic.save();
    return newFavoriteMusic;
  } catch (e) {
    throw new Error('Error while save Favorite Music');
  }
};


async function updateFavoriteMusic(user,  listSongs) {
  try {
    user.listSongs.push(listSongs.toString());
    await user.save();
    return user;
  } catch (e) {
    throw new Error('Error while update Favorite Music');
  }
}


favoritesService.upsertFavorite = async function ({ userId,  listSongs }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return await updateFavoriteMusic(user, listSongs);
    }
    return await createFavorite(userId, listSongs);
  } catch (e) {
    throw new Error('Error while save Favorite Music');
  }
};

favoritesService.getFavorite = async function ({ id }) {
  try {
    const favorites = await FavoriteMusic.findById(id);
    return favorites;
  } catch (e) {
    throw new Error('Error while returning favorites');
  }
};


module.exports = favoritesService;