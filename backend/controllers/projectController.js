const Employee = require('../models/employeeModel');
const Project = require('../models/projectModel');
const jwt = require('jsonwebtoken');

exports.showAll = async (req, res) => {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      const loggedUser= await Employee.findById(decoded.userId);
      const projects = await Project.find({ company: loggedUser ? loggedUser.company : decoded.userId});
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: "Error while fetching projects: " + error.message });
    }
  };

exports.create = async (req, res)=>{
    try {
        const {custId, purchaseOrderNo, purchaseOrderDate, purchaseOrderValue, category, startDate, endDate, advancePay, payAgainstDelivery, payfterCompletion, remark, projectStatus, POCopy}= req.body;
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const emp= await Employee.findById(decoded.userId);
        const newProject= await Project({
            custId,
            purchaseOrderNo,
            purchaseOrderDate,
            purchaseOrderValue,
            category,
            startDate,
            endDate,
            advancePay,
            payAgainstDelivery,
            payfterCompletion,
            remark,
            completeLevel:0,
            POCopy,
            company: emp && emp.company ? emp.company : decoded.userId,
        });

        if(newProject){
            console.log('New Project Created');
            await newProject.save();
            res.status(200).json(newProject);
        }
    } catch (error) {
        res.status(500).json({error:"Error while creating Project: "+error.message});
    }
};

exports.delete = async (req, res)=>{
    try {
        const project= await Project.findByIdAndDelete(req.params.id);
        if(!project){
            res.status(400).json({error:"Project not found"});
        }
        res.status(200).json({message:"Project Deleted sucessfylly"});

    } catch (error) {
        res.status(500).json({error:"Error while deleting project: "+error.message});
    }
};

exports.update= async (req, res)=>{
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!project){
            res.status(400).json({error:"Project not found"});
        }
    } catch (error) {
        res.status(500).json({error:"Error while Updating the upating: "+error.message});
    }
};