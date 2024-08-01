const express = require('express');
const router= express.Router();

const taskController= require('../controllers/taskSheetController');
const { isManager, isLoggedIn, isDeveloper } = require('../middlewares/auth');


router.get('/',isLoggedIn, taskController.showAll);

router.post('/',isManager, taskController.create);

router.put('/:id',isManager, taskController.update);

router.delete('/:id',isManager, taskController.delete);

module.exports= router;