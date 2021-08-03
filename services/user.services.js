const md5 = require('md5'); // encriptar contraseña
const User = require('../models/user.model');

const userService = {};

// POST METODOS

// funcion que crea el usuario con sus campos nombre, correo y contraseña

userService.createUser = async function ({ name, email, password }) {
  try {
    const user = new User({ name, email, password: md5(password) });
    const newUser = await user.save();
    return newUser;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while save user');
  }
};

// funcion que revisa si el usuario existe y compara contraseñas

userService.userLogin = async function ({ email, password }) {
  try {
    const userInfo = await User.findOne({ email });
    if (userInfo.password === md5(password)) {
      const info = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        existe: true,
      };
      return info;
    }
    const info = {
      existe: false,
    };
    return info;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error dont exist User');
  }
};

// GET METODOS

// funcion que me devuelve todos los usuarios

userService.getUsers = async function (query) {
  try {
    const users = await User.find(query);
    console.log('users', users);
    return users.map((user) => {
      const getUser = JSON.parse(JSON.stringify(user));
      delete getUser.password;
      return getUser;
    });
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while paginating users');
  }
};

// funcion que me devuelve solo un usuario por medio de su ID

userService.getUser = async function ({ id }) {
  try {
    const user = await User.findById(id);
    const savableUser = JSON.parse(JSON.stringify(user));
    delete savableUser.password;
    return savableUser;
  } catch (e) {
    console.log(e.message);
    throw Error('Error while returning User');
  }
};

// PUT METODOS

// funcion que permite editar el nombre del usuario por medio de su id

userService.updateUser = async function ({ id }, { name }) {
  try {
    const user = await User.findById(id);
    const updateUser = await user.set({ name });
    delete updateUser.password;
    await updateUser.save();
    return updateUser;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while update user');
  }
};

module.exports = userService;
