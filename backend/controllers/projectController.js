const jwt = require('jsonwebtoken');
const moment = require('moment');
const { ObjectId } = require('mongodb');

const Project = require('../models/projectModel');
const Tasksheet = require('../models/taskSheetModel');
const ProjectHistory = require('../models/projectHistoryModel');
const TaskSheet = require('../models/taskSheetModel');

exports.showAll = async (req, res) => {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

      const page= parseInt(req.query.page) || 1;
      const limit= parseInt(req.query.limit) || 10;
      const skip = (page - 1)*limit;

      const projects = await Project.find({ company: decoded.user.company? decoded.user.company:decoded.user._id})
      .skip(skip)
      .limit(limit)
      .populate('custId','custName');

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

  exports.getProject = async (req, res)=>{
    try {
      const project = await Project.findById(req.params.id);
      if(!project){
        return res.status(400).json({error:"Project not found"});
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({error:"Error in getProject: "+error.message});
    }
  };

exports.myProjects = async (req, res)=>{
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

    // Get unique project IDs from tasks for the specific company
    const uniqueProjectIds = await TaskSheet.distinct("project", { company: decoded.user.company, employees:decoded.user._id });

    // Fetch the unique projects using the retrieved project IDs
    const projects = await Project.find({ _id: { $in: uniqueProjectIds } }).populate('custId','custName');

    res.status(200).json({projects});
  } catch (error) {
      res.status(500).json({ error: "Error In My project controller: " + error.message });
  }
}

exports.search = async (req, res) => {
    try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const query = req.query.search;

        const projects = await Project.find({
        company: decoded.user.company ? decoded.user.company : decoded.user._id,
        name: { $regex: query, $options: 'i' }
        });
        
        if (projects.length <= 0) {
        return res.status(400).json({ error: "No Projects Found" });
        }

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error while searching projects: " + error.message });
    }
};

exports.create = async (req, res)=>{
    try {
        let {name,custId, address,completeLevel,purchaseOrderNo, purchaseOrderDate, purchaseOrderValue, category, startDate, endDate, advancePay, payAgainstDelivery, payfterCompletion, remark, POCopy}= req.body;
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        completeLevel=completeLevel===undefined?0:completeLevel;
        console.log("At Backend"+address);
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
            completeLevel:completeLevel,
            POCopy,
            Address:address,
            projectStatus:completeLevel<=0?"upcoming":completeLevel<100?"inprocess":"finished",
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

exports.delete = async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(400).json({ error: "Project not found" });
      }
  
      // Delete tasksheets associated with the project
      await Tasksheet.deleteMany({ _id: { $in: project.tasks } });
  
      res.status(200).json({ message: "Project Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error while deleting project: " + error.message });
    }
  };

  exports.updateProject = async (req, res) => {
    const { id } = req.params;  // Get id from request parameters
    const {name,custId, Address,completeLevel,purchaseOrderNo,projectStatus ,purchaseOrderDate, purchaseOrderValue, category, startDate, endDate, advancePay, payAgainstDelivery, payafterCompletion, remark, POCopy  } = req.body;
    const originalData = await Project.findById(id);
    const updateData= {
      name,
      custId,
      Address,
      completeLevel,
      purchaseOrderDate,
      projectStatus,
      purchaseOrderNo,
      category,
      startDate,
      endDate,
      advancePay,
      payAgainstDelivery,
      payafterCompletion,purchaseOrderValue,
      remark, POCopy
    }
    try{
      let changes = [];

    // Helper function to track changes
    const trackChanges = (fieldName, oldValue, newValue) => {
      if (['startDate', 'endDate', 'purchaseOrderDate'].includes(fieldName)) {
        oldValue = oldValue.toISOString();
      }
      if (typeof newValue === 'object' && newValue._id) {
        newValue = new ObjectId(newValue._id);
      }
      if (oldValue.toString() !== newValue.toString()) {
        changes.push({
          projectId: id,
          fieldName: fieldName,
          oldValue: oldValue,
          newValue: newValue,
          changeReason: req.body.changeReason || 'Updated via project edit',
        });
      }
    };

    if(originalData.length <= 0){
      return res.status(400).json({error:"Project not found"});
    }

      for (const key in updateData) {
        if (updateData[key] !== originalData[key]) {
          trackChanges(key,originalData[key],updateData[key]);
        }
      }

      if (changes.length > 0) {
        await ProjectHistory.insertMany(changes);
      }

      await Project.findByIdAndUpdate(id, { $set: updateData });
      return res.status(200).json({message:"Project Updated Successfuly"});
  
    } catch (error) {
      console.error('Error updating project:', error);
      return res.status(500).json({ error: 'Internal server error: '+error.message });
    }
  };
  