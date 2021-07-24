const playlistService = require('../services/playlist.services');

const playlistController = {};

playlistController.upsert = async function (req, res, next) {
  try {
    const upsertPlaylist = await playlistService.upsertPlaylist(req.body);
    return res.status(201).json({ status: 201, data: upsertPlaylist });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};



playlistController.getPlaylist = async function (req, res,next){
  try{
      const playlist = await  playlistService.getPlaylist(req.params)
      if( playlist == null){
          return res.status(400).json({message: "Cannot find playlist"})
      }
      return res.status(200).json({ status: 200, data: playlist, message: "Successufully playlist retrived"})
      }catch(error){
          return res.status(400).json({status:400, message: error.message})
      }
}

playlistController.deletePlaylist = async function (req, res, next){ //preguntar si el id existe
  try{
      const  playlist = await  playlistService.deletePlaylist(req.params)
      return res.status(200).json({status: 200, data:  playlist, message: "Successfully deleted playlist"})

  }   catch(error){
      return res.status(400).json({status:400, message: error.message})
  }
}



module.exports = playlistController;