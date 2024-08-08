const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const dashboardController= require('../controllers/dashboardController');
const {isCompany, permissionMiddleware} = require('../middlewares/auth');


router.get('/dashboard', dashboardController.dashboard);

// get all employess (Admin and manager Only)
router.get('/',permissionMiddleware(['viewEmployee']),employeeController.showAll);

router.post('/',isCompany,employeeController.create);

// Delete an employee (Admin only)
router.delete('/:id', isCompany, employeeController.deleteEmployee);

// Update an employee (Admin only)
router.put('/:id', isCompany, employeeController.updateEmployee);   


module.exports = router;
