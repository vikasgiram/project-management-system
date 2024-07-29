const Employee = require('../models/employeeModel');
const jwt = require('jsonwebtoken');

// show all employees
exports.showAll = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const loggedUser = await Employee.findById(decoded.userId);
    console.log(loggedUser);
    const employees = await Employee.find({company:loggedUser && loggedUser.company ? loggedUser.company: decoded.userId});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching employees: " + error.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    console.log(employee);
    if (!employee) {
      return res.status(404).json({ error: `Employee not found` });
    }
    res.status(200).json({ message: `${employee.username} has been deleted successfully` });
  } catch (error) {
    res.status(400).json({ error:"Error while Deleted Employee: "+error.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const updateData = {};
    for (const key in req.body) {
      if (key !== 'username' && key !== 'password') {
        updateData[key] = req.body[key];
      }
    }
    const employee = await Employee.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: "Error while updating Employee: " + error.message });
  }
};
