const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {isLoggedIn, isCompany } = require('../middlewares/auth');


// Login route
router.post('/login',authController.login);

// logout route
router.get('/logout',isLoggedIn, authController.logout);

router.post('/forget-password',authController.forgetPassword);

router.post('/reset-password/:id/:token',authController.resetPassword);

router.post('/change-password', authController.changePassword);

module.exports = router;
