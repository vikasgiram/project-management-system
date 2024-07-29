const express = require('express');
const { isLoggedIn, isSales, isCompany } = require('../middlewares/auth');
const { showAll, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const router = express.Router();



// get all customers
router.get('/customer', isLoggedIn, showAll);

// create Customers
router.post('/customer', isSales, createCustomer);

// Update Customers
router.put('/customer/:id',isSales, updateCustomer);

// delete Customers
router.delete('/customer/:id',isSales, deleteCustomer);


module.exports=router;
