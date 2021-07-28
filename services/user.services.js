const md5 = require('md5')
const User = require('../models/user.model');


const userService = {};

userService.createUser = async function ({ name, email, password}){
  try {
    const user = new User({ name, email, password: md5(password) });
    const newUser = await user.save();
    return newUser;
  } catch (e) {
    console.log(e.message)
    throw new Error('Error while save user');
  }
};

userService.getUsers = async function () {
  try {
    const users = await User.find({});
    return users;
  } catch (e) {
    console.log(e.message)
    throw new Error('Error while paginating users');
  }
};

userService.getUser = async function ({ id }) {
  try {
    const user = await User.findById(id);
    let getUser = JSON.parse(JSON.stringify(user));
    delete getUser.password;
    return getUser;
  } catch (e) {
    console.log(e.message)
    throw new Error('Error while returning user');
  }
  
};

userService.updateUser = async function ({ id }, { name, email, password }) {
  try {
    const user = await User.findById(id);
    const updateUser = await user.set({ name, email, password });
    await updateUser.save();
    return updateUser;
  } catch (e) {
    console.log(e.message)
    throw new Error('Error while update user');
  }
};

userService.deleteUser = async function ({ id }) {
  try {
    const user = await User.findByIdAndRemove(id);
    return user;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while delete user');
  }
};



module.exports = userService;
