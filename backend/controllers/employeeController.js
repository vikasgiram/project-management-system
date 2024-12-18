const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { ObjectId } = require("mongodb");
const Employee = require('../models/employeeModel');
const Project = require('../models/projectModel');
const EmployeeHistory = require('../models/employeeHistoryModel');
const TaskSheet = require('../models/taskSheetModel');


// show all employees
exports.showAll = async (req, res) => {
  try {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const employees = await Employee.find({company:decoded.user.company?decoded.user.company:decoded.user._id},{ password: 0 })
    .skip(skip)
    .limit(limit)
    .populate('department', 'name') 
    .populate('designation', 'name');


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

exports.getEmployee = async (req, res)=>{
  try {
    const {id}= req.params;
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.find({company:decoded.user.company?decoded.user.company:decoded.user._id, department:id},{ password: 0 });
    if(!employee){
      return res.status(400).json({error:"Employee not found"});
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({error:"Error in getting employee: "+error.message});
  }
};

exports.search = async (req, res) => {
  try {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
      company: decoded.user.company ? decoded.user.company : decoded.user._id,
      $or: [
        { empName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    };

    const employees = await Employee.find(filter,{ password: 0 })
      .skip(skip)
      .limit(limit);

    if (employees.length <= 0) {
      return res.status(400).json({ error: "No employees found" });
    }

    const totalRecords = await Employee.countDocuments(filter);
    res.status(200).json({
      employees,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords
    });
  } catch (error) {
    res.status(500).json({ error: "Error while searching employees: " + error.message });
  }
};

exports.dashboard = async (req, res) => {
  try {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if(!token){
    return res.status(403).json({ error: 'Unauthorized you need to login first' });
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get unique project IDs from tasks for the specific company
    const uniqueProjectIds = await TaskSheet.distinct("project", { company: decoded.user.company, employees:decoded.user._id});
    const assignedTasks= await TaskSheet.find({company:decoded.user.company, employees:decoded.user._id, taskStatus:'upcomming'}).populate('taskName','name');
    const inprocessTasks= await TaskSheet.find({company:decoded.user.company, employees:decoded.user._id, taskStatus:'inprocess'}).populate('taskName','name');

    // Fetch upcoming projects
    const assignedProgects = await Project.find({
      _id: { $in: uniqueProjectIds },
      projectStatus: 'upcoming' // Filter for upcoming projects
    });

    // Fetch in-process projects
    const inProcessProjects = await Project.find({
      _id: { $in: uniqueProjectIds },
      projectStatus: 'inprocess' // Filter for in-process projects
    });

    // Count completed projects
    const completedCount = await Project.countDocuments({
      _id: { $in: uniqueProjectIds },
      projectStatus: 'completed' // Count completed projects
    });

    // Send the response with separate project lists and counts
    res.status(200).json({
      assignedTasks,
      inprocessTasks,
      completedCount,
      inprocessCount: inProcessProjects.length,
      totalProjects: (completedCount+ inProcessProjects.length + assignedProgects.length)
    });
  } catch (error) {
    res.status(500).json({ error: "Error In Employee dashboard controller: " + error.message });
  }
};

exports.create=async (req, res) => {
  try {
    const {name, mobileNo, hourlyRate,designation, email, password,department, confirmPassword, gender}=req.body;
    if(password !== confirmPassword){
      return res.status(400).json({error:`Password desen\'t match!!!`});
    }

    const emp= await Employee.findOne({email});
    const company= await Company.findOne({email});
    const admin= await Admin.findOne({email});
    if(company || admin){
      return res.status(400).json({error:"Email allready exists!!!"});
    }

    if(emp){
      console.log(emp);
      return res.status(400).json({error:"User already exists"});
    }

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if(!token){
    return res.status(403).json({ error: 'Unauthorized you need to login first' });
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`;
    const otherProfilePic= `https://avatar.iran.liara.run/username?username=${name}`;
    const newEmp=Employee({
      name,
      mobileNo,
      hourlyRate,
      designation,
      company:decoded.user._id,
      department,
      email:email.toLowerCase(),
      password:hashPassword,
      gender,
      profilePic:gender==='male'?boyProfilePic: gender==='female'? girlProfilePic:otherProfilePic
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
    // Fetch original employee data before update
    const {id} = req.params;
    const originalData = await Employee.findById(id);
    const {name, department, mobileNo, hourlyRate, designation, email}= req.body

    
    if (!originalData) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    const updateData = {
      name,
      department,
      mobileNo,
      hourlyRate,
      designation,
      email
    };

    let changes=[];
 
    const trackChanges = (fieldName, oldValue, newValue) => {
      if (typeof newValue === 'object' && newValue._id) {
        newValue = new ObjectId(newValue._id);
      }
      if (oldValue.toString() !== newValue.toString()) {
        changes.push({
          employeeId: id,
          fieldName: fieldName,
          oldValue: oldValue,
          newValue: newValue,
          changeReason: req.body.changeReason || 'Updated via Employee edit',
        });
      }
    };

    for (const key in updateData) {
      if (updateData[key] !== originalData[key]) {
        trackChanges(key, originalData[key], updateData[key]);
      }
    }

    if (changes.length > 0) {
      await EmployeeHistory.insertMany(changes);
    }
  
    await Employee.findByIdAndUpdate(id, { $set: updateData });

    res.status(200).json({ message: 'Employee data updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error while updating Employee: ' + error.message });
  }
};

