const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// modelo de la coleccion playlist del usuario

const playlistMusicSchema = mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  listSongs: [String],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { versionKey: false });

const PlaylistMusic = mongoose.model('PlaylistMusic', playlistMusicSchema);
module.exports = PlaylistMusic;
