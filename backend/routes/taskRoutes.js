const express = require('express');
const router= express.Router();

const taskController= require('../controllers/taskSheetController');
const { permissionMiddleware } = require('../middlewares/auth');


router.get('/',permissionMiddleware(['viewTask']), taskController.showAll);

router.get('/my',permissionMiddleware(['viewTask']), taskController.myTask);

router.post('/',permissionMiddleware(['createTask']),taskController.create);

router.put('/:id', permissionMiddleware(['updateTask']), taskController.update);

router.delete('/:id',permissionMiddleware(['deleteTask']), taskController.delete);

module.exports= router;