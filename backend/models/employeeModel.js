const mongoose = require('mongoose');
const Company = require("./companyModel");
const Department = require('./departmentModel');
const Designation = require('./DesignationModel');


const employeeSchema = new mongoose.Schema({
  name: {
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
  mobileNo: {
    type: String,
    required: true,
    trim: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref:Designation,
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
  },
  gender:{
    type: String,
    required: true,
    enum:["male","female", "other"]
  },
  profilePic:{
    type: String,
    default:"",
  },
  performance: [
    {
      year: Number,
      month: Number,
      performance: Number
    }
  ]
}, {
  timestamps: true,
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

