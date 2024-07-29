const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isAdmin} = require('../middlewares/auth');
const { route } = require('./authRoutes');

router.get('/admin', isAdmin, adminController.getAdmin);

router.post('/admin',isAdmin, adminController.admin);

router.delete('/admin/:id',isAdmin,adminController.deleteAdmin);

module.exports=router;