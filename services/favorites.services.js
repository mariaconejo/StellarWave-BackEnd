const mongoose = require('mongoose');
const FavoriteMusic = require('../models/favorite.model');

const favoritesService = {};

async function findUser(userId) {
  try {
    const user = FavoriteMusic.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user ? user : null;
  } catch (e) {
    console.log('Error Message', e.message)
    throw  Error('Error while getting user');
  }
}

async function createFavorite (userId,  listSongs) {
  try {
    const favoritemusic = new FavoriteMusic({ userId,  listSongs });
    const newFavoriteMusic = await favoritemusic.save();
    return newFavoriteMusic;
  } catch (e) {
    console.log('Error Message', e.message)
    throw  Error('Error while save Favorite Music');
  }
};


async function updateFavoriteMusic(user,  listSongs) {
  try {
    user.listSongs.push(listSongs.toString());
    await user.save();
    return user;
  } catch (e) {
    console.log('Error Message', e.message)
    throw  Error('Error while update Favorite Music');
  }
}

favoritesService.upsertFavorite = async function ({ userId,  listSongs }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return await updateFavoriteMusic(user, listSongs);
    }else{
      return await createFavorite(userId, listSongs)
    }
  } catch (e) {
    console.log('Error Message', e.message)
    throw  Error('Error while save Favorite Music');
  }
};

async function deleteFavoriteMusic (user, listSongs) {
  try {
      user.listSongs.pull(listSongs);
      user.save()
      return user;
  } catch (e) {
    
      console.log('Error Message', e.message)
      throw Error('Error while delete Favorite Music')
  }
}





favoritesService.getFavoriteByUser = async function ({ userId }) {
  try {
    const favorites = await FavoriteMusic.find({userId: mongoose.Types.ObjectId(userId)});
    return favorites;
  } catch (e) {
    console.log('Error Message', e.message)
    throw  Error('Error while returning favorites');
  }
};

favoritesService.deleteFavoriteMusicByUserAndSong  = async function ({userId, song}) {
  try {
      const user = await findUser (userId) 
      if (user){
          return deleteFavoriteMusic(user, song)
      }
  } catch (e) {
      
      console.log('Error Message', e.message)
      throw Error('Error while save Favorite Music')
  }
} 

module.exports = favoritesService;