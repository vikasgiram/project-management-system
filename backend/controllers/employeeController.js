const Employee = require('../models/employeeModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// show all employees
exports.showAll = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const employees = await Employee.find({company:decoded.user.company?decoded.user.company:decoded.user._id})
    .skip(skip)
    .limit(limit);

    if(employees.length<=0){
      return res.status(400).json({error:"No employees found "});
    }

    const totalRecords = await Employee.countDocuments({company:decoded.user.company? decoded.user.company: decoded.user._id});
    res.status(200).json({
      employees,
      currentPage:page,
      totalPages:Math.ceil(totalRecords / limit),
      totalRecords
    });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching employees: " + error.message });
  }
};

exports.create=async (req, res) => {
  try {
    const {empName, empMobileNo, hourlyRate,role, email, password,department, confirmPassword}=req.body;
    if(password !== confirmPassword){
      return res.status(400).json({error:`Password desen\'t match!!!`});
    }

    const emp= await Employee.findOne({email});

    if(emp){
      console.log(emp);
      return res.status(400).json({error:"User already exists"});
    }

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);

    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const newEmp=Employee({
      empName:empName,
      empMobileNo:empMobileNo,
      hourlyRate:hourlyRate,
      role:role,
      company:decoded.user._id,
      department,
      email:email.toLowerCase(),
      password:hashPassword,
    });

    if(newEmp){
      console.log(newEmp.email+" Created:");
      await newEmp.save();
      res.status(201).json(newEmp);
    }
    else{
      res.status(400).json({error:"Invalid Employee Data!!!"});
    }


  } catch (error) {
    res.status(400).json({ error: "Error in authController: "+error.message });
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
