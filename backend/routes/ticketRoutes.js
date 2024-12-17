const express = require('express');
const router= express.Router();

const ticketController = require('../controllers/ticketController');

router.get('/',ticketController.showAll);

router.post('/',ticketController.create);

router.put('/:id',ticketController.update);

router.delete('/:id', ticketController.delete);

module.exports= router;