const Customer = require("../models/customerModel");
const Employee = require("../models/employeeModel");
const Project = require("../models/projectModel");
const Task= require("../models/taskSheetModel");
const jwt = require("jsonwebtoken");


exports.devDashbord= async(req , res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt,process.env.JWT_SECRET);
        const emp= await Employee.findById(decoded.userId);
        const tasks= await Task.find({company:emp.company, employees:emp._id});
        if(!tasks){
            return res.status(404).json({message:"No tasks found"});
        }
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({error:"Error while featching tasks: "+error.message});
    }
}

exports.manDashbord = async (req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const emp = await Employee.findById(decoded.userId);
        const allTasks = await Task.find({company:emp.company}).populate('projectId employees', 'name empName');
        if(allTasks){
            res.status(200).json({allTasks});
        }
        else
            res.status(200).json({message:"No tasks "});
    } catch (error) {
        res.status(500).json({error:"Error while getting tasks"});
    }
}

exports.projectUpdate = async (req, res)=>{
    try {

        const project= await Project.findById(req.params.id);
        const {completeLevel}= req.body;

        if(project){
            if(project.completeLevel!==100){
                if(completeLevel>0 && completeLevel < 100){
                    project.projectStatus='inprocess';
                }
                else if(completeLevel == 100){
                    project.projectStatus='finished';
                }
            }
            else{
                res.status(400).json({error:"Project allredy complated "});
            }
        }
        else 
            res.status(400).json({error:"Project not found"});
    } catch (error) {
        res.status(500).json({error:"Error while updating the project status"});
    }
}

exports.salesDashbord = async (req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const emp = await Employee.findById(decoded.userId);
        const customers= await Customer.find({company:emp.company}).populate('createdBy','empName');
        const projects = await Project.find({company:emp.company});
        res.status(200).json({
            customers: customers,
            projects: projects
        });
    } catch (error) {
        res.status(500).json({error:"Error while getting customers and projects: "+error.message});
    }
}

exports.devTaskUpdate = async (req, res)=>{
    try {
        const task= await Task.findById(req.params.id);
        const {taskLevel,action, workCompletionPhoto}=req.body;
        if(task){
            if(task.taskLevel!==100){
                if(taskLevel>=100){
                    task.taskStatus="finished";
                }
                else if(taskLevel>0){
                    task.taskStatus="inprocess";
                }
                task.taskLevel=taskLevel;
                task.workCompletionPhoto=workCompletionPhoto;
                task.action.push(action);
                await task.save();
                res.status(200).json({message:"Task updated sucessfully "});
            }
            else{
                res.status(400).json({error:"Task is allready complated !!!"});
            }
        }
        else
            res.status(404).json({error:"Task not found"});
    } catch (error) {
        res.status(500).json({error:"Error while updating task: "+error.message});
    }
}