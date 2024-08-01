const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isAdmin} = require('../middlewares/auth');
const companyController = require('../controllers/companyController');

router.get('/', isAdmin, adminController.getAdmin);

router.get('/company',isAdmin, companyController.showAll);

router.post('/',isAdmin, adminController.admin);

router.delete('/:id',isAdmin,adminController.deleteAdmin);

module.exports=router;