const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require('./employeeModel');
const Project = require('./projectModel');
const Company = require('./companyModel');

// Define the taskSheet schema
const taskSheetSchema = new Schema({
  employees:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee, // Reference to the Employee schema
  }],
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:Company
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Project, // Reference to the Project schema
    required: true // projectId is required
  },
  taskName: {
    type: String, // Task name is a string
    required: true // taskName is required
  },
  taskStatus: {
    type: String,
    enum: ['upcoming','inprocess', 'finished'], // taskStatus can only be one of these values
    default:'upcoming'
  },
  actionStartDate: {
    type: Date, // Start time of the action in HH:MM format
    required: true // actionStartTime is required
  },
  actionEndDate: {
    type: String, // End time of the action in HH:MM format
    required: true // actionEndTime is required
  },
  action: [{
    type: String,
    required: true,
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
