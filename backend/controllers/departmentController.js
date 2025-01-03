const jwt = require('jsonwebtoken');

const Department = require('../models/departmentModel');
const Designation = require('../models/designationModel');
const Employee = require('../models/employeeModel');


exports.showAll = async (req, res)=>{
    try {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        if(!token){
            return res.status(403).json({ error: 'Unauthorized you need to login first' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const department= await Department.find({company:decoded.user.company? decoded.user.company: decoded.user._id});

        const totalRecords = await Department.countDocuments({company:decoded.user.company? decoded.user.company: decoded.user._id});

        if(department.length<=0){
            return res.status(400).json({error:"Department not found"});
        }
        res.status(200).json({
            department
        });
    } catch (error) {
        res.status(500).json({error:"Error while Getting the Departments: "+error.message});
    }
}

exports.create = async ( req, res)=>{
            try {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        if(!token){
            return res.status(403).json({ error: 'Unauthorized you need to login first' });
        }
        const {name}=req.body;

        const existingDepartment = await Department.findOne({name});

        if(existingDepartment){
            return res.status(400).json({error:"Department with this name already exists"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const dep= await Department({
            name,
            company:decoded.user.company?decoded.user.company:decoded.user._id
        });

        if(!dep){
            return res.status(400).json({error:"Department not created"});
        }
        await dep.save();
        res.status(200).json({dep});
    } catch (error) {
        res.status(500).json({error:"Error while Creating Department: "+error.message});
    }
}

exports.delete = async (req, res) => {
    try {
        const designationCount = await Designation.countDocuments({ department: req.params.id });
        if (designationCount > 0) {
            return res.status(400).json({ error: "Cannot delete department because there are designations associated with it." });
        }

        const employeeCount = await Employee.countDocuments({ department: req.params.id });
        if (employeeCount > 0) {
            return res.status(400).json({ error: "Cannot delete department because there are employees associated with it." });
        }

        const dep = await Department.findByIdAndDelete(req.params.id);
        if (!dep) {
            return res.status(400).json({ error: "Department Not Found." });
        }

        res.status(200).json({ dep });
    } catch (error) {
        res.status(500).json({ error: "Error while deleting department: " + error.message });
    }
}

exports.update = async (req, res)=>{
    try {
        const dep = await Department.findByIdAndUpdate(req.params.id,req.body,{new: true});

        if(!dep){
            return res.status(400).json({error:"Department Not found "});
        }
        res.status(200).json({dep});
    } catch (error) {
        res.status(500).json({error:"Error while Updating Department: "+error.message});
    }
}