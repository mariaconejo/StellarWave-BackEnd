const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// modelo de la coleccion lista de recientes

const recentMusicSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  listSongs: [String],
}, { versionKey: false });

const RecentMusic = mongoose.model('RecentMusic', recentMusicSchema);
module.exports = RecentMusic;
