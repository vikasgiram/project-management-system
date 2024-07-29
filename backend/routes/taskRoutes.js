const express = require('express');
const router= express.Router();

const taskController= require('../controllers/taskSheetController');
const { isManager, isLoggedIn, isDeveloper } = require('../middlewares/auth');


router.get('/task',isLoggedIn, taskController.showAll);

router.post('/task',isManager, taskController.create);

router.put('/task/:id',isManager, taskController.update);

router.put('/task/:id',isDeveloper,taskController.work);

router.delete('/task/:id',isManager, taskController.delete);

module.exports= router;