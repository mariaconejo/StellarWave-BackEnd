const favoritesService = require('../services/favorites.services');

const favoriteController = {};

favoriteController.upsert = async function (req, res, next) {
  try {
    const upsertFavorite = await favoritesService.upsertFavorite(req.body);
    return res.status(201).json({ status: 201, data: upsertFavorite });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

favoriteController.getFavorite = async function (req, res,next){
  try{
      const favorite = await favoritesService.getFavorite(req.params)
      if(favorite == null){
          return res.status(400).json({message: "Cannot find favlist"})
      }
      return res.status(200).json({ status: 200, data: favorite, message: "Successufully favlist retrived"})
      }catch(error){
          return res.status(400).json({status:400, message: error.message})
      }
}




module.exports = favoriteController;
