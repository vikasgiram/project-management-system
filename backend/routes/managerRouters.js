const express = require('express');
const router= express.Router();
const empDashbordController = require('../controllers/empDashbordController')

router.get('/manager/dashbord',empDashbordController.manDashbord);


module.exports= router;