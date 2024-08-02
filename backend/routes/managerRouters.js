const express = require('express');
const router= express.Router();
const empDashbordController = require('../controllers/empDashbordController');
const { isManager } = require('../middlewares/auth');

router.get('/dashbord', isManager,empDashbordController.manDashbord);

router.post('/project/:id', isManager, empDashbordController.projectUpdate);

module.exports= router;