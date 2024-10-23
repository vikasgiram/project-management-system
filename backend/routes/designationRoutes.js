const express = require('express');
const router = express.Router();
const designationController = require("../controllers/designationController");
const { isCompany, permissionMiddleware } = require('../middlewares/auth');

router.get('/Alldesignations', permissionMiddleware(['viewDesignation']), designationController.showAll);

router.get('/', permissionMiddleware(['viewDesignation']), designationController.getDesignation);

router.post('/',isCompany, designationController.create);

router.put('/:id',isCompany, designationController.update);

router.delete('/:id',isCompany, designationController.delete);

module.exports= router;