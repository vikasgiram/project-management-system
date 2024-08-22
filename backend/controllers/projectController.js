const Project = require('../models/projectModel');
const jwt = require('jsonwebtoken');

exports.showAll = async (req, res) => {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

      const page= parseInt(req.query.page) || 1;
      const limit= parseInt(req.query.limit) || 10;
      const skip = (page - 1)*limit;

      const projects = await Project.find({ company: decoded.user.company? decoded.user.company:decoded.user._id})
      .skip(skip)
      .limit(limit);

      if(projects.length<=0){
        return res.status(400).json({error:"No Projects Found"});
      }

      const totalRecords = await Project.countDocuments({ company: decoded.user.company? decoded.user.company:decoded.user._id});

      res.status(200).json({
        projects,
        currentPage:page,
        totalPages: Math.ceil(totalRecords/limit),
        totalRecords
      });
    } catch (error) {
      res.status(500).json({ error: "Error while fetching projects: " + error.message });
    }
  };

exports.create = async (req, res)=>{
    try {
        const {name,custId, purchaseOrderNo, purchaseOrderDate, purchaseOrderValue, category, startDate, endDate, advancePay, payAgainstDelivery, payfterCompletion, remark, projectStatus, POCopy}= req.body;
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const newProject= await Project({
            custId,
            name,
            purchaseOrderNo,
            purchaseOrderDate:new Date(purchaseOrderDate),
            purchaseOrderValue,
            category,
            startDate:new Date(startDate),
            endDate: new Date(endDate),
            advancePay,
            payAgainstDelivery,
            payfterCompletion,
            remark,
            completeLevel:0,
            POCopy,
            company: decoded.user.company? decoded.user.company:decoded.user._id
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
        res.status(200).json({message:"Project Updated sucessfully..."});
    } catch (error) {
        res.status(500).json({error:"Error while Updating the upating: "+error.message});
    }
};