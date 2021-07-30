const mongoose = require('mongoose');
const RecentMusic = require('../models/recent.model');

const recentService = {};

async function findUser(userId) {
  try {
    const user = RecentMusic.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user ? user : null;
  } catch (e) {
    console.log('Error Message', e.message)
    throw new Error('Error while getting user');
  }
}

async function createRecent(userId,  listSongs) {
  try {
    const recentmusic = new RecentMusic({ userId,  listSongs });
    const newRecentMusic = await recentmusic.save();
    return newRecentMusic;
  } catch (e) {
    console.log('Error Message', e.message)
    throw new Error('Error while save Favorite Music');
  }
};


async function updateRecentMusic(user,  listSongs) {
  try {
    user.listSongs.unshift(listSongs.toString());
    await user.save();
    return user;
  } catch (e) {
    console.log('Error Message', e.message)
    throw new Error('Error while update Recent Music');
  }
}


recentService.upsertRecent = async function ({ userId,  listSongs }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return await updateRecentMusic(user, listSongs);
    }
    return await createRecent(userId, listSongs);
  } catch (e) {
    console.log('Error Message', e.message)
    throw new Error('Error while save Recent Music');
  }
};

recentService.getRecentByUser = async function ({ userId }) {
  try {
    const recentmusic = await RecentMusic.find({userId: mongoose.Types.ObjectId(userId)});
    return recentmusic;
  } catch (e) {
    console.log('Error Message', e.message)
    throw  Error('Error while returning recentmusic');
  }
};


module.exports = recentService;
