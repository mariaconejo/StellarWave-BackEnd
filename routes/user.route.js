const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

// POST

// ruta que crea los usuarios
router.post('/user', userController.create);

// ruta que verifica los usuarios

router.post('/user/login', userController.userLogin);

// GET

// ruta que devuelve todos los usuarios

router.get('/users', userController.getUsers);

// ruta que devuelve un usuario  por su id
router.get('/user/:id', userController.getUser);

// PUT

// ruta que edita el nombre del usuario

router.put('/user/:id', userController.updateUser);

module.exports = router;
