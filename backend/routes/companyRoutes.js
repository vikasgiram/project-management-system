const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { isAdmin, isCompany } = require('../middlewares/auth');
const comDashbordController = require('../controllers/comDashbordController');


router.get('/',isAdmin, companyController.showAll);

router.post('/',isAdmin, companyController.createCompany);

router.get('/dashboard', isCompany,comDashbordController.dashboard );

router.put('/:id',isAdmin, companyController.updateCompany);

router.delete('/:id',isAdmin, companyController.deleteCompany);

module.exports = router;