const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require('./employeeModel');
const Company = require('./companyModel');
const Task = require('./taskModel');
const Project = require('./projectModel');

// Define the taskSheet schema
const taskSheetSchema = new Schema({
  project:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  employees:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee, // Reference to the Employee schema
  }],
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:Company
  },
  taskName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Task,
    required: true // taskName is required
  },
  taskStatus: {
    type: String,
    enum: ['stuck','inprocess', 'finished'], // taskStatus can only be one of these values
  },
  startDate:{
    type: Date,
    required: true
  },
  endDate:{
    type: Date,
    required: true
  },
  Action: [{
    action: {
      type: String
    },
    startTime: {
      type: Date,
      required:false
    },
    endTime: {
      type: Date,
      required:false
    },
  }],

  remark: {
    type: String // Additional remarks or comments about the task
  },
  taskLevel: {
    type: Number,
    min: 0, // Minimum value for taskLevel is 0
    max: 100, // Maximum value for taskLevel is 100
    default: 0,
  },
  workCompletionPhoto: {
    type: String // URL or path to the photo of the completed work
  }
});

// Create the model from the schema
const TaskSheet = mongoose.model('TaskSheet', taskSheetSchema);

module.exports = TaskSheet; // Export the TaskSheet model for use in other files
