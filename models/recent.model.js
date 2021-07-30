const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recentMusicSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  listSongs: [String],
}, { versionKey: false });

const RecentMusic = mongoose.model('RecentMusic', recentMusicSchema);
module.exports = RecentMusic;