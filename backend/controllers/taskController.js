const jwt = require('jsonwebtoken')
const Task = require('../models/taskModel');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
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
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
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
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(400).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error while Deleting task: " + error.message });
  }
};