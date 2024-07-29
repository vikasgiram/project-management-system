const mongoose = require('mongoose');
const Company = require("./companyModel");

const employeeSchema = new mongoose.Schema({
  empName: {
    type: String,
    required: true,
    trim: true,
  },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:Company
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
    type: String,
    required: true,
    enum: ['developer', 'sales', 'manager'],
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

