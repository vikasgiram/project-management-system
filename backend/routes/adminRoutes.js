const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isAdmin} = require('../middlewares/auth');

router.get('/', isAdmin, adminController.getAdmin);

router.post('/',isAdmin, adminController.admin);

router.delete('/:id',isAdmin,adminController.deleteAdmin);

module.exports=router;