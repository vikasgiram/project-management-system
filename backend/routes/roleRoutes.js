const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { isCompany } = require('../middlewares/auth');

router.get('/allRoles', isCompany, roleController.showAll);

router.get('/', isCompany, roleController.getRole);

router.post('/',isCompany, roleController.create);

router.put('/:id',isCompany, roleController.update);

router.delete('/:id',isCompany, roleController.delete);

module.exports= router;