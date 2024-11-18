const express = require('express');
const router= express.Router();

const actionController = require('../controllers/actionController');

router.get('/:taskId',actionController.showAll);

router.post('/',actionController.create);

router.put('/id',actionController.update);

router.delete('/:id', actionController.delete);

module.exports= router;