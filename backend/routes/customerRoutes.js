const express = require('express');
const {permissionMiddleware } = require('../middlewares/auth');
const { showAll, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const router = express.Router();



// get all customers
router.get('/', permissionMiddleware(['viewCustomer']), showAll);

// create Customers
router.post('/',permissionMiddleware(['createCustomer']), createCustomer);

// Update Customers
router.put('/:id',permissionMiddleware(['updateCustomer']), updateCustomer);

// delete Customers
router.delete('/:id', permissionMiddleware(['deleteCustomer']), deleteCustomer);


module.exports=router;
