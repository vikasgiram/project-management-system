const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  department:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required:true
  },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Company',
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
    ref:'Designation',
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
      year: {
        type: Number,
        default: () => new Date().getFullYear() 
      },
      month: {
        type: Number,
        default: () => new Date().getMonth() + 1 
      },
      performance: {
        type: Number,
        default: 50 
      }
    }
  ]
}, {
  timestamps: true,
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

