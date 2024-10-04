const mongoose = require('mongoose');
const Customer = require('./customerModel.js');
const Employee = require('./employeeModel.js');
const Company = require('./companyModel.js');
const TaskSheet = require('./taskSheetModel.js');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  custId: {
    // Reference to the customer for this project
    type: mongoose.Schema.Types.ObjectId,
    ref: Customer,
  },
  name:{
    type:String,
    required:true
  },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:Company
  },
  purchaseOrderNo: {
    // Purchase order number
    type: String,
    required: true,
  },
  purchaseOrderDate: {
    // Date of the purchase order
    type: Date,
    required: true,
    default: Date.now(),
  },
  purchaseOrderValue: {
    // Value of the purchase order / cost of the project
    type: Number,
    required: true,
  },
  category: {
    // category
    type:String,
    enum: [
      'Surveillance System',
      'Access Control System',
      'Turnkey Project',
      'Alleviz',
      'CafeLive',
      'WorksJoy',
      'WorksJoy Blu',
      'Fire Alarm System',
      'Fire Hydrant System',
      'IDS',
      'AI Face Machines',
      'Entrance Automation',
      'Guard Tour System',
      'Home Automation',
      'IP PA and Communication System',
    ],
    required: true,
  },
  Address:{
    add:String,
    city:String,
    state:String,
    country:String,
    pincode:String
  },
  startDate: {
    // Start date of the project
    type: Date,
    required: true
  },
  endDate: {
    // Estimate End date of the project
    type: Date,
    required: true,
  },
  advancePay: {
    // Advance payment percentage 
    type: Number,
    required: true,
    min: 0, // Minimum value of 0
    max: 100, // Maximum value of 100
  },
  payAgainstDelivery: {
    // payment percentage against delivery
    type: Number,
    required: true,
    min: 0, // Minimum value of 0
    max: 100, // Maximum value of 100
  },
  payfterCompletion: {
    // payment percentage after completion
    type: Number,
    required: true,
    min: 0, // Minimum value of 0
    max: 100, // Maximum value of 100
  },
  remark: {
    // Remarks for the project
    type: String,
    required: true,
  },
  projectStatus: {
    // Status of the project
    type: String,
    required: true,
    enum: ['upcoming', 'inprocess', 'finished'], // Allowed values
    default:'upcoming'
  },
  completeLevel: {
    // Completion level of the project
    type: Number,
    required: true,
    min: 0, // Minimum value of 0
    max: 100, // Maximum value of 100
  },
  POCopy: {
    // Copy of the purchase order
    type: String,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

// Create and export the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
