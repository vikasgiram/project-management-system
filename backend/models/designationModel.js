const mongoose = require('mongoose');
const Department = require('./departmentModel');
const Company = require('./companyModel');

const designationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Company
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Department
    },
    permissions:[{
        type: String,
        required: true,
        enum: [
            'createCustomer',
            'updateCustomer',
            'deleteCustomer',
            'viewCustomer',

            'viewTask',
            'createTask',
            'updateTask',
            'deleteTask',

            'createProject',
            'updateProject',
            'deleteProject',
            'viewProject',

            'createEmployee',
            'updateEmployee',
            'deleteEmployee',
            'viewEmployee',

            'viewTaskSheet',
            'createTaskSheet',
            'updateTaskSheet',
            'deleteTaskSheet',

        ],
    }]

});

const Designation = mongoose.model('Designation', designationSchema);

module.exports= Designation;