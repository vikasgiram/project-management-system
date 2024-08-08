const TaskSheet = require('../models/taskSheetModel');
const jwt = require('jsonwebtoken');

exports.showAll = async (req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const task= await TaskSheet.find({company: decoded.user.company? decoded.user.company: decoded.user._id});
        if(task.length<=0){
            return res.status(400).json({error:"No Task Found "});
        }
        res.status(200).json(task);
    } catch (error) {
        req.status(500).json({error:"Error while featching the Task Sheets: "+error.message});
    }
};

exports.create= async (req, res)=>{
    try {
        const {projectId,employees, taskName, startDate, endDate, remark}= req.body;
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const task= await TaskSheet.create({
            employees,
            projectId,
            taskName,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            remark,
            company: decoded.user.company ? decoded.user.company: decoded.user._id
        });

        if(task){
            console.log("TaskSheet created for "+task.taskName);
            // task.save(); 
            res.status(200).json(task);
        }
    } catch (error) {
        res.status(500).json({error:"Error while creating taskSheet: "+error.message});
    }
};

exports.update= async(req, res)=>{
    try {
        const task= await TaskSheet.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!task){
            res.status(400).json({error:"Tasksheet not found"});
        }
        res.status(200).json({message:"Tasksheet Updated "});
    } catch (error) {
        res.status(500).json({error:"Error while Updating Task Sheet: "+error.message});
    }
};

exports.delete= async (req, res)=>{
    try {
        const task= await TaskSheet.findByIdAndDelete(req.params.id);

        if(!task){
            res.status(400).json({error:"TaskSheet not found "});
        }
        res.status(200).json({message:"TaskSheet Deleted "});
    } catch (error) {
        res.status(500).json({error:"Error while Deleting tasksheet: "+error.message});
    }
};

