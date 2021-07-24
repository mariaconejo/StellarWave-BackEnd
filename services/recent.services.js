const mongoose = require('mongoose');
const RecentMusic = require('../models/recent.model');

const recentService = {};

async function findUser(userId) {
  try {
    const user = RecentMusic.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user ? user : null;
  } catch (e) {
    throw new Error('Error while getting user');
  }
}

async function createRecent(userId,  listSongs) {
  try {
    const recentmusic = new RecentMusic({ userId,  listSongs });
    const newRecentMusic = await recentmusic.save();
    return newRecentMusic;
  } catch (e) {
    throw new Error('Error while save Favorite Music');
  }
};


async function updateRecentMusic(user,  listSongs) {
  try {
    user.listSongs.unshift(listSongs.toString());
    await user.save();
    return user;
  } catch (e) {
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
    throw new Error('Error while save Recent Music');
  }
};


recentService.getRecent = async function ({ id }) {
  try {
    const recent = await RecentMusic.findById(id);
    return recent;
  } catch (e) {
    throw new Error('Error while returning recent songs');
  }
};


module.exports = recentService;
