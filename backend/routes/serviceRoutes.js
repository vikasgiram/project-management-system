const express = require('express');
const router= express.Router();

const serviceController = require('../controllers/serviceController');

router.get('/',serviceController.showAll);

router.get('/myService',serviceController.myServices);

router.post('/',serviceController.create);

router.put('/:id',serviceController.update);

router.delete('/:id', serviceController.delete);

module.exports= router;