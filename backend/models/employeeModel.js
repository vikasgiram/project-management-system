const mongoose = require('mongoose');
const Company = require("./companyModel");
const Department = require('./departmentModel');
const Role = require('./roleModel');

const employeeSchema = new mongoose.Schema({
  empName: {
    type: String,
    required: true,
    trim: true,
  },
  department:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Department,
    required:true
  },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:Company,
    required:true
  },
  empMobileNo: {
    type: String,
    required: true,
    trim: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref:Role,
    required: true,
  },email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

