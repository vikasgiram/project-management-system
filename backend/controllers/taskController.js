const jwt = require('jsonwebtoken')
const Task = require('../models/taskModel');
const TaskSheet = require('../models/taskSheetModel');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const task = await Task.create({
      name,
      company: decoded.user.company ? decoded.user.company : decoded.user._id
    });

    if (task) {
      console.log("Task created");
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(500).json({ error: "Error while creating task: " + error.message });
  }
};

exports.showAll = async (req, res) => {
  try {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const task = await Task.find({ company: decoded.user.company ? decoded.user.company : decoded.user._id });

    if (task.length <= 0) {
      return res.status(400).json({ error: "No Task Found" });
    }
    res.status(200).json({
      task,
      totalRecord: task.length
    });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching the Tasks: " + error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      res.status(400).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task Updated" });
  } catch (error) {
    res.status(500).json({ error: "Error while Updating Task: " + error.message });
  }
};

exports.delete = async (req, res) => {
  try {

    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    await TaskSheet.deleteMany({ taskName: id });

    if (!task) {
      return res.status(400).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error while Deleting task: " + error.message });
  }
};