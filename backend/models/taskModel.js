const mongoose = require('mongoose');
const Company = require('./companyModel');
const Schema = mongoose.Schema;

// Define the taskSheet schema
const taskSchema = new Schema({

  name: {
    type: String, // Task name is a string
    required: true // taskName is required
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref: Company,
    required: true
  },

});

// Create the model from the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // Export the Task model for use in other files
