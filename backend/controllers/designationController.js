
const jwt = require('jsonwebtoken');
const Designation = require('../models/DesignationModel');

exports.showAll = async (req, res) => {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
     
  
      const designations = await Designation.find({
        company: decoded.user.company ? decoded.user.company : decoded.user._id,
      }).populate('department', 'name');
  
      res.status(200).json({ designations });
    } catch (error) {
      res.status(500).json({ error: 'Error while Getting Designations: ' + error.message });
    }
  };

  exports.getDesignation = async (req, res) => {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      const departmentId = req.query.department; // Get departmentId from query params
  
      if (!departmentId) {
        return res.status(400).json({ error: 'Department ID is required' });
      }
  
      const designations = await Designation.find({
        company: decoded.user.company ? decoded.user.company : decoded.user._id,
        department: departmentId
      }).populate('department', 'name');
  
      if (designations.length <= 0) {
        return res.status(400).json({ error: 'No Designations Found in this department' });
      }
  
      res.status(200).json({ designations });
    } catch (error) {
      res.status(500).json({ error: 'Error while Getting Designations: ' + error.message });
    }
  };

exports.create = async (req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const {name, department, permissions}= req.body;
        const newDesignation = await Designation({
            name,
            department,
            company:decoded.user._id,
            permissions,
        });

        if(newDesignation){
            await newDesignation.save();
            return res.status(200).json({newDesignation});
        }
        res.status(400).json({error:"Designation not created "});
    } catch (error) {
        res.status(500).json({error:"Error while Creating Designation: "+ error.message});
    }
};

exports.update = async ( req, res)=>{
    try {
        const designation= await Designation.findByIdAndUpdate(req.params.id,req.body,{ new: true });

        if(!designation){
            return res.status(400).json({error:"Designation not found"});
        }
      
        res.status(200).json({designation});
        
    } catch (error) {
        res.status(500).json({error: "Error while Updating Designation: "+error.message});
    }
}

exports.delete = async (req, res)=>{
    try {
        const designation= await Designation.findByIdAndDelete(req.params.id);
        if(!designation){
            return res.status(400).json({error:"Designation not found "});
        }
        res.status(200).json({designation});
    } catch (error) {
        res.status(500).json({error:"Error while Deleting Designation: "+error.message});
    }
}