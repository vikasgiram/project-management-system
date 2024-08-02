const mongoose = require('mongoose');
const Company = require('../models/companyModel');

const taskSchema = mongoose.Schema({
    name:{
        type:String,
        required: trusted,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Company
    },
});

const Task= mongoose.model('Task',taskSchema);

module.exports= Task;