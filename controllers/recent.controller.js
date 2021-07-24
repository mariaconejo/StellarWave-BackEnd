const recentService = require('../services/recent.services');

const recentController = {};

recentController.upsert = async function (req, res, next) {
  try {
    const upsertRecent = await recentService.upsertRecent(req.body);
    return res.status(201).json({ status: 201, data: upsertRecent });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

recentController.getRecent = async function (req, res,next){
  try{
      const recent = await recentService.getRecent(req.params)
      if(recent == null){
          return res.status(400).json({message: "Cannot find favlist"})
      }
      return res.status(200).json({ status: 200, data: recent, message: "Successufully recentlist retrived"})
      }catch(error){
          return res.status(400).json({status:400, message: error.message})
      }
}






module.exports = recentController;
