const favoritesService = require('../services/favorites.services');

const favoriteController = {};



favoriteController.upsertFavorite = async function (req, res, next) {
  try {
    const newFavoriteMusic  = await favoritesService.upsertFavorite(req.body);
    return res.status(201).json({ status: 201, data: newFavoriteMusic  });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};


favoriteController.getFavoriteByUser = async function (req, res,next){
  try{
      const favorite = await favoritesService.getFavoriteByUser(req.params)
      return res.status(200).json({ status: 200, data: favorite, message: "Successufully favlist retrived"})
      }catch(error){
          return res.status(400).json({status:400, message: error.message})
      }
}

favoriteController.deleteFavoriteMusicByUserAndSong= async function (req, res, next) {
  try {
      const favoriteMusic =  await favoritesService.deleteFavoriteMusicByUserAndSong(req.params)
      return res.status(202).json({  status: 202, data: favoriteMusic, message: "Item removed successfully" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
}



module.exports = favoriteController;
