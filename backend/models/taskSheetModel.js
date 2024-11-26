const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define the taskSheet schema
const taskSheetSchema = new Schema({
  project:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  employees:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the Employee schema
  }],
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Company'
  },
  taskName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true // taskName is required
  },
  taskStatus: {
    type: String,
    enum: ['stuck','inprocess', 'completed', 'upcomming'], // taskStatus can only be one of these values
    default: 'upcomming'
  },
  startDate:{
    type: Date,
    required: true
  },
  endDate:{
    type: Date,
    required: true
  },
  actualEndDate:{
    type: Date,
  },
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
