const express = require('express');
const { isDeveloper } = require('../middlewares/auth');
const router= express.Router();

const empDashbordController = require('../controllers/empDashbordController');



router.get('/dashbord', isDeveloper, empDashbordController.devDashbord);

router.put('/task/:id', isDeveloper, empDashbordController.devTaskUpdate);


module.exports= router;