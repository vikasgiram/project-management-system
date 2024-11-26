const jwt = require('jsonwebtoken');

const Action = require('../models/actionModel');
const TaskSheet = require('../models/taskSheetModel');


exports.showAll = async (req,res)=>{
    try {
        const {taskId}= req.params;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        const actions = await Action.find({task:taskId}).populate('actionBy','name');

        if(actions.length<=0){
            return res.status(400).json({message:"No Actions Avaliavle"});
        }
        res.status(200).json(actions);
    } catch (error) {
        res
      .status(500).json({
        error: "Error while featching the Tasksheet Actions : " + error.message,
      });
    }
}

exports.update = async (req,res)=>{
    try {
        const {id}= req.params;
        const {task,action,startTime,endTime,taskStatus,complated} = req.body;
        const updatedData={
          action,
          startTime,
          endTime,
          complated,
        }
        const tasksheet= await TaskSheet.findById(task);
        const newAction=await Action.findByIdAndUpdate(id, updatedData, { new: true });
        tasksheet.taskStatus=taskStatus;
        tasksheet.taskLevel=complated;

        await tasksheet.save();
        if(newAction.length<=0){
            return res.status(400).json({error:"action not found..."});
        }
        res.status(200).json({message:"Action Updated..."});
    } catch (error) {
        res
      .status(500).json({
        error: "Error while Updating the Tasksheet Action : " + error.message,
      });
    }
}

exports.create= async(req, res)=>{
    try {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const {task, action, startTime, endTime, taskStatus, taskLevel, remark} = req.body;
        const tasksheet= await TaskSheet.findById(task);


        const newAction =await Action({
            task,
            action,
            actionBy:decoded.user._id,
            startTime,
            endTime,
            complated:taskLevel,
            remark
        });

        
        if(taskStatus==='completed'){
          tasksheet.taskStatus=taskStatus;
          tasksheet.taskLevel=100;
          tasksheet.actualEndDate=endTime;
        }
       
        tasksheet.taskLevel=taskLevel;
        tasksheet.taskStatus=taskStatus;
        
        await tasksheet.save();

        if(!newAction){
          return res.status(400).json({error:"Action not created"});
        }
        await newAction.save();
        res.status(200).json({message:"Action Created"});
    } catch (error) {
        res
      .status(500).json({
        error: "Error while Creating the Tasksheet Action : " + error.message,
      });
    }
}

exports.delete = async (req, res)=>{
    try {
        const {id} = req.params;
        const action = await Action.findByIdAndDelete(id);
        if(!action){
            return res.status(400).json({error:"Action not found..."});
        }
        res.status(200).json({message:"Action Deleted Successfully..."});
    } catch (error) {
        res
      .status(500).json({
        error: "Error while deleting the Tasksheet Action : " + error.message,
      });
    }
}