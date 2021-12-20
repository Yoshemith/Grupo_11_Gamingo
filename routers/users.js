const express = require('express');
const router = express.Router();

//CONTROLLER
const usersController = require('../controllers/usersController');

//MIDDLEWARES
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');
const validacionRegistro = require('../middlewares/validateRegisterMiddleware');
const validacionLogin = require('../middlewares/validateLoginMiddleware');
const validacionUpdateProfile = require('../middlewares/validateUpdateProfileMiddleware');

//REGISTER
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', uploadFile.single('imagenUsuario'), validacionRegistro, usersController.registerProcess);

//LOGIN
router.get('/login', guestMiddleware, usersController.login);
router.post('/login',validacionLogin, usersController.loginProcess);

//EDITE PROFILE
router.get('/editProfile', authMiddleware, usersController.profileData);
router.post('/editProfile',uploadFile.single('imagenUsuario'), validacionUpdateProfile, usersController.updateProfile);
router.post('/destroyProfile', usersController.destroy);

//CHANGE PASSWORD
router.get('/changePass', usersController.changePass);

//DASHBOARD, MY PROFILE & LOGOUT
router.get('/dashboard', authMiddleware, usersController.dashboard);
router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', usersController.logout);

module.exports = router;