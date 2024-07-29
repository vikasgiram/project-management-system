const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {isLoggedIn, isCompany } = require('../middlewares/auth');


// Create an employee (Admin only)
router.post('/signup',isCompany, authController.signup);

// Login route
router.post('/login',authController.login);

// logout route
router.get('/logout',isLoggedIn, authController.logout);

module.exports = router;
