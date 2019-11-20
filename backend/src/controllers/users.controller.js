
//Funciones por aparte para tener mas orden
const User = require('../models/User');
const userCtrl = {};

//Funcion que nos permite ver los usuarios registrados
userCtrl.getUsers = async (req, res) => { 
  try {
    const users = await User.find();
    res.json(users);
  }
  catch (err) {
    res.status(400).json({
      error: err
    });
  }
};

//Funcion cuando queremos crear un nuevo usuario
userCtrl.createUser = async (req, res) => {
  try {
    const { username } = req.body;

    const newUser = new User({ username });
    await newUser.save();
    res.json('User created');
  } catch (e) {
    console.log(e)
    res.json(e.errmsg);
  }
};

//Funcion para eliminar un usuario
userCtrl.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json('User deleted');
}

module.exports = userCtrl;