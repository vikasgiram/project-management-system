const Project = require('../models/projectModel');
const Tasksheet = require('../models/taskSheetModel');
const jwt = require('jsonwebtoken');
const ProjectHistory = require('../models/projectHistoryModel');

exports.showAll = async (req, res) => {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

      const page= parseInt(req.query.page) || 1;
      const limit= parseInt(req.query.limit) || 10;
      const skip = (page - 1)*limit;

      const projects = await Project.find({ company: decoded.user.company? decoded.user.company:decoded.user._id})
      .skip(skip)
      .limit(limit)
      .populate('custId','custName')
      .populate('tasks');

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
      const project = await Project.findByIdAndDelete(req.params.id);
      if(!project){
        return res.status(400).json({error:"Project not found"});
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({error:"Error in getProject: "+error.message});
    }
  };

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
        let {name,custId, completeLevel,purchaseOrderNo, purchaseOrderDate, purchaseOrderValue, category, startDate, endDate, advancePay, payAgainstDelivery, payfterCompletion, remark, POCopy}= req.body;
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        completeLevel=completeLevel===undefined?0:completeLevel;
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
    try {
      const originalValue = Project.findById(req.params.id);
      const updateData = {};
      for (const key in req.body) {
        // If relevant nested object, extract only the _id
        if (key === 'relatedField') { // Replace with the actual nested field name if needed
          updateData[key] = req.body[key]._id; // Extract only the _id
        } else {
          updateData[key] = req.body[key];
        }
      }
      
      const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
      if (!project) {
        return res.status(400).json({ error: "Project not found" });
      }
  
      // Log changes to history (similar logic as above)
      const changes = Object.keys(updateData)
        .map(key => {
          const newValue = updateData[key];
  
          // Only log changes if values are different
          if (JSON.stringify(originalValue) !== JSON.stringify(newValue)) {
            return {
              fieldName: key,
              oldValue: originalValue,
              newValue: newValue,
              changeDate: new Date(),
              changeReason: 'Project update',
              projectId: req.params.id,
            };
          }
        })
        .filter(change => change); // Filter out undefined values
  
      if (changes.length > 0) {
        await ProjectHistory.insertMany(changes);
      }
  
      res.status(200).json({ message: "Project updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error while updating project: " + error.message });
    }
  };
  