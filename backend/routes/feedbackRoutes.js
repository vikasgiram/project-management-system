const express = require('express');
const router= express.Router();

const feddbackController= require('../controllers/feedbackController');
const { permissionMiddleware } = require('../middlewares/auth');


router.get('/', feddbackController.showAll);

router.post('/',feddbackController.create);


module.exports= router;