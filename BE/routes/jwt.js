const express = require('express');
const sessionRoutes = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth')

sessionRoutes.post('/',UserController.login_user);

sessionRoutes.delete('/', auth,UserController.delete_session);



module.exports = sessionRoutes