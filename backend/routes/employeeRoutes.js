const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {isCompany, permissionMiddleware} = require('../middlewares/auth');


router.get('/dashboard', employeeController.dashboard);

// get all employess (Admin and manager Only)
router.get('/',permissionMiddleware(['viewEmployee']),employeeController.showAll);


router.get('/search',permissionMiddleware(['viewEmployee']), employeeController.search);

router.post('/', permissionMiddleware(['createEmployee']),employeeController.create);

// Delete an employee (Admin only)
router.delete('/:id', permissionMiddleware(['deleteEmployee']), employeeController.deleteEmployee);

// Update an employee (Admin only)
router.put('/:id', permissionMiddleware(['updateEmployee']), employeeController.updateEmployee);   

router.get('/:id', permissionMiddleware(['viewEmployee']), employeeController.getEmployee);

module.exports = router;
