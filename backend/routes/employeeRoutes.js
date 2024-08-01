const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const empDashbord= require('../controllers/empDashbordController');
const {isCompany, isLoggedIn, isManager, isSales} = require('../middlewares/auth');


// get all employess (Admin and manager Only)
router.get('/',isLoggedIn,employeeController.showAll);

// Delete an employee (Admin only)
router.delete('/:id', isCompany, employeeController.deleteEmployee);

router.get('/manager',isManager,empDashbord.manDashbord);

router.get('/sales',isSales,empDashbord.salesDashbord);

// Update an employee (Admin only)
router.put('/:id', isCompany, employeeController.updateEmployee);   

module.exports = router;
