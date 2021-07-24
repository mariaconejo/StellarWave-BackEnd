const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recentMusicSchema = mongoose.Schema({
  listSongs: [String],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { versionKey: false });

const RecentMusic = mongoose.model('RecentMusic', recentMusicSchema);
module.exports = RecentMusic;