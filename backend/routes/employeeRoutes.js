const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {isCompany, isLoggedIn} = require('../middlewares/auth');


// get all employess (Admin and manager Only)
router.get('/employees',isLoggedIn,employeeController.showAll);

// Delete an employee (Admin only)
router.delete('/employees/:id', isCompany, employeeController.deleteEmployee);

// Update an employee (Admin only)
router.put('/employees/:id', isCompany, employeeController.updateEmployee);   

module.exports = router;
