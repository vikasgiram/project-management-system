const mongoose = require('mongoose');
const Company = require('../models/companyModel');

const departmentSchema = new mongoose.Schema({
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Company
      },
    name:{
        type:String,
        required: true
    } 
});

const Department = mongoose.model('Department',departmentSchema);

module.exports= Department;