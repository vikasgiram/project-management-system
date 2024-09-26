const Department = require('../models/departmentModel');
const jwt = require('jsonwebtoken');
const Designation = require('../models/DesignationModel');


exports.showAll = async (req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

        const page=parseInt(req.query.page)|| 1;
        const limit= parseInt(req.query.limit) || 10;
        const skip = (page - 1)*limit;

        const department= await Department.find({company:decoded.user.company? decoded.user.company: decoded.user._id})
        .skip(skip)
        .limit(limit);

        const totalRecords = await Department.countDocuments({company:decoded.user.company? decoded.user.company: decoded.user._id});

        if(department.length<=0){
            return res.status(400).json({error:"Department not found"});
        }
        res.status(200).json({
            department,
            currentPage:page,
            totalPages:Math.ceil(totalRecords/limit),
            totalRecords
        });
    } catch (error) {
        res.status(500).json({error:"Error while Getting the Departments: "+error.message});
    }
}

exports.create = async ( req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const {name}=req.body;
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

exports.delete =async (req, res)=>{
    try {
        const dep= await Department.findByIdAndDelete(req.params.id);
        await Designation.deleteMany({ department: req.params.id });
        if(!dep){
            return res.status(400).json({error:"Department Not Found "});
        }
        res.status(200).json({dep});
    } catch (error) {
        res.status(500).json({error:"Error while deleting Department: "+error.message});
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