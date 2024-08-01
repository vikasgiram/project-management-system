const express = require('express');
const { isLoggedIn, isSales, isCompany } = require('../middlewares/auth');
const { showAll, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const router = express.Router();



// get all customers
router.get('/', isLoggedIn, showAll);

// create Customers
router.post('/', isSales, createCustomer);

// Update Customers
router.put('/:id',isSales, updateCustomer);

// delete Customers
router.delete('/:id',isSales, deleteCustomer);


module.exports=router;
