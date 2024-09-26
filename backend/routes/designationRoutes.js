const express = require('express');
const router = express.Router();
const designationController = require("../controllers/designationController");
const { isCompany } = require('../middlewares/auth');

router.get('/Alldesignations', isCompany, designationController.showAll);

router.get('/', isCompany, designationController.getDesignation);

router.post('/',isCompany, designationController.create);

router.put('/:id',isCompany, designationController.update);

router.delete('/:id',isCompany, designationController.delete);

module.exports= router;