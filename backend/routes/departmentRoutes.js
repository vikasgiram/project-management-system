const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { isCompany } = require('../middlewares/auth');

router.get('/', isCompany, departmentController.showAll);

router.post('/', isCompany, departmentController.create);

router.put('/:id', isCompany, departmentController.update);

router.delete('/:id', isCompany, departmentController.delete);

module.exports = router;