const mongoose = require('mongoose');
const Employee = require('./employeeModel');
const Company = require("./companyModel");

// Define the Customer schema
const customerSchema = new mongoose.Schema({
  createdBy: {
    // Reference to the employee who created this customer entry
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee, 
  },
  email:{
    type: String,
    required: true,
    trim:true,
  },
  custName: {
    // Customer's name
    type: String,
    required: true,
    trim: true,
  },
  billingAddress: {
    // Billing address of the customer
    type: String,
    required: true,
  },
  city: {
    // City of the customer
    type: String,
    required: true,
  },
  state: {
    // State of the customer
    type: String,
    required: true,
  },
  country: {
    // Country of the customer
    type: String,
    required: true,
  },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:Company
  },
  deliveryAddress: {
    // Delivery address of the customer
    type: String,
    required: true,
  },
  GSTNo: {
    // GST number of the customer
    type: String,
    required: true,
  },
  customerContactPersonName1: {
    // Name of the contact person for the customer
    type: String,
    required: true,
  },
  phoneNumber1: {
    // Phone number of the contact person
    type: String,
    required: true,
  },customerContactPersonName2: {
    // Name of the contact person for the customer
    type: String,
    required: true,
  },
  phoneNumber2: {
    // Phone number of the contact person
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});


// Create and export the Customer model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
