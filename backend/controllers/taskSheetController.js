const Employee = require('../models/employeeModel');
const TaskSheet = require('../models/taskSheetModel');
const jwt = require('jsonwebtoken');

exports.showAll = async (req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const loggedUser = await Employee.findById(decoded.userId);
        const task= await TaskSheet.find({company: loggedUser ? loggedUser.company: jwt.decode.userId});
        if(task){
            res.status(200).json(task);
        }
    } catch (error) {
        req.status(500).json({error:"Error while featching the Task Sheets: "+error.message});
    }
};

exports.create= async (req, res)=>{
    try {
        const {projectId, taskName, actionStartDate, actionEndDate, remark, workCompletionPhoto}= req.body;
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const emp= await Employee.findById(decoded.userId);
        const task= await TaskSheet.create({
            empId: decoded.userId,
            projectId,
            taskName,
            actionStartDate,
            actionEndDate,
            remark,
            workCompletionPhoto,
            company:emp && emp.company? emp.company : decoded.userId,
        });

        if(task){
            console.log("TaskSheet created for "+task.taskName);
            await task.save();
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


exports.work = async (req, res)=>{
    try {
        const {taskStatus, action, remark, taskLevel,workCompletionPhoto}= req.body;
        const task= await TaskSheet.findById(req.params.id);
        task.taskStatus=taskStatus;
        task.action=action;
        task.remark=remark;
        task.taskLevel=taskLevel;
        workCompletionPhoto?task.workCompletionPhoto=workCompletionPhoto:"";
        if(!task){
            res.status(400).json({error:"TaskSheet not found "});
        }
        await task.save();
        res.status(200).json({message:"Task Updated Sucessfully"});
    } catch (error) {
        res.status(500).json({error:"Error while Updating Task wrok Details: "+error.message});
    }
};