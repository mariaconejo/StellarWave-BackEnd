const userService = require('../services/user.services');

const userController = {};

// POST METODO

// Controla lo que retona la funciona que crea usuarios

userController.create = async function (req, res, next) {
  try {
    const newUser = await userService.createUser(req.body);
    return res.status(201).json({ newUser });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

// Controla lo que retona la funciona que verifica los usuarios y su contraseña

userController.userLogin = async function (req, res, next) {
  try {
    const loginUser = await userService.userLogin(req.body);
    return res.status(200).json({ status: 200, data: loginUser, message: 'Successufully users login' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

// GET METODO

// Controla lo que retona la funciona que devuelve todos los usuarios creados

userController.getUsers = async function (req, res, next) {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({ status: 200, data: users, message: 'Successufully users retrived' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

// Controla lo que retona la funciona que devuelve un usuario por su ID

userController.getUser = async function (req, res, next) {
  try {
    const user = await userService.getUser(req.params);
    if (user == null) {
      return res.status(400).json({ message: 'Cannot find user' });
    }
    return res.status(200).json({ status: 200, data: user, message: 'Successfully user retrived' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// PUT METODO

// Controla lo que retona la funciona que edita el nombre del usuario por medio de su ID

userController.updateUser = async function (req, res, next) {
  try {
    const updateUser = await userService.updateUser(req.params, req.body);
    return res.status(200).json({ status: 200, data: updateUser, message: 'Successfully user update' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = userController;
