const { json } = require("express");
const TaskSheet = require("../models/taskSheetModel");
const jwt = require("jsonwebtoken");

exports.showAll = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const task = await TaskSheet.find({
      company: decoded.user.company ? decoded.user.company : decoded.user._id,
    }).populate("project", "name");

    if (task.length <= 0) {
      return res.status(400).json({ error: "No Task Found " });
    }
    res.status(200).json({
      task,
      totalRecord: task.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error while featching the Task Sheets: " + error.message,
      });
  }
};

exports.getTaskSheet = async (req, res) => {
 try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const { id } = req.params;
    const task = await TaskSheet.find(
      {
        company: decoded.user.company ? decoded.user.company : decoded.user._id, project:id
      }
    ).populate({
      path: "project",
      select: "name startDate endDate completeLevel",
    })
    .populate('taskName','name')
    .populate('employees','name');

    if (task.length <=0) {
      return res.status(400).json({ error: "No Task Found " });
    }
    res.status(200).json({ task });
 } catch (error) {
    res.status(500).json({error:"Error while getting taskheet using id: "+error.message});
 }
};

exports.myTask = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const {projectId} = req.params;
    const task = await TaskSheet.find({
      company: decoded.user.company,
      employees: decoded.user._id,
      project:projectId
    }).populate('taskName','name');

    if (task.length <= 0) {
      return res.status(400).json({ error: "Their is no task" });
    }
    res.status(200).json({
      task,
      totalRecord: task.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in myTask controller: " + error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { project, employees, taskName, startDate, endDate, remark } =
      req.body;
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const task = await TaskSheet.create({
      employees,
      taskName,
      project,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      remark,
      company: decoded.user.company ? decoded.user.company : decoded.user._id,
    });

    if (task) {
      console.log("TaskSheet created for " + task.taskName);
      return res.status(200).json(task);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while creating taskSheet: " + error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedData= req.body;
    const task = await TaskSheet.findById(req.params.id);
    if (!task) {
      return res.status(400).json({ error: "Tasksheet not found" });
    }
    if(updatedData.taskStatus==='completed'){
      task.taskLevel=100;
      task.actualEndDate=updatedData.Actions.endTime;
      task.taskStatus=updatedData.taskStatus;
    }
    task.remark=updatedData.remark;
    task.Actions.push(updatedData.Actions);
    task.save();
    res.status(200).json({ message: "Tasksheet Updated " });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while Updating Task Sheet: " + error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const task = await TaskSheet.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(400).json({ error: "TaskSheet not found " });
    }
    res.status(200).json({ message: "TaskSheet Deleted " });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while Deleting tasksheet: " + error.message });
  }
};
