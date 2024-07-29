const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { isAdmin } = require('../middlewares/auth');


router.get('/companys',isAdmin, companyController.showAll);

router.post('/company',isAdmin, companyController.createCompany);

router.put('/company/:id',isAdmin, companyController.updateCompany);

router.delete('/company/:id',isAdmin, companyController.deleteCompany);

module.exports = router;