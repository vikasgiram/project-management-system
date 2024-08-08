const mongoose = require('mongoose');
const Department = require('./departmentModel');
const Company = require('./companyModel');

const roleSchema = new mongoose.Schema({
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

        ],
    }]

});

const Role = mongoose.model('Role', roleSchema);

module.exports= Role;