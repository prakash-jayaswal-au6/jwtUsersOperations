const express = require('express');
const userRoutes = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');

const dotenv = require('dotenv');
dotenv.config();


userRoutes.post('/createuser',auth, UserController.register_user);

userRoutes.post('/register', UserController.register_user);

userRoutes.post('/deleteuser/:userId', UserController.delete_user);


//get all users profile
userRoutes.get('/',UserController.get_users)

module.exports = userRoutes;