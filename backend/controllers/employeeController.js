const Employee = require('../models/employeeModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Designation = require('../models/DesignationModel');
const EmployeeHistory = require('../models/employeeHistoryModel');

// show all employees
exports.showAll = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
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
    const employee = await Employee.findById(req.params.id);
    if(!employee){
      return res.status(400).json({error:"Employee not found"});
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({error:"Error in getCustomer: "+error.message});
  }
};

exports.search = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
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

exports.dashboard= async(req , res)=>{
  try {
      const decoded = jwt.verify(req.cookies.jwt,process.env.JWT_SECRET);
      const designation=await Designation.findById(decoded.user.role);
      const permission=designation.permissions;
      const dashboardData={};
      if(permission.includes('viewCustomer')){
          dashboardData.customer=await Customer.find({company:decoded.user.company});
      }
      if(permission.includes('viewTask')){
          dashboardData.task= await TaskSheet.find({company:decoded.user.company});
      }
      if(permission.includes('viewProject')){
          console.log("You have permission to view project");
          dashboardData.project=await Project.find({company:decoded.user.company});
      }
      res.status(200).json(dashboardData);
  } catch (error) {
      res.status(500).json({error:"Error In Employee dashborad controller: "+error.message});
  }
}

exports.create=async (req, res) => {
  try {
    const {name, mobileNo, hourlyRate,designation, email, password,department, confirmPassword}=req.body;
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
      name,
      mobileNo,
      hourlyRate,
      designation,
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
    // Fetch original employee data before update
    const originalEmployee = await Employee.findById(req.params.id);

    if (!originalEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const updateData = {};
    for (const key in req.body) {
      if (key !== 'username' && key !== 'password' && key !== '_id') {
        // Check if the field is a department or designation and only store the _id
        if (key === 'department' || key === 'designation') {
          updateData[key] = req.body[key]._id; // Extract only the _id
        } else {
          updateData[key] = req.body[key];
        }
      }
    }

    // Update employee data
    const employee = await Employee.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Log changes to history
    const changes = Object.keys(updateData)
      .map(key => {
        const originalValue = originalEmployee[key];
        const newValue = updateData[key];

        // Only log changes if values are different
        if (JSON.stringify(originalValue) !== JSON.stringify(newValue)) {
          return {
            fieldName: key,
            oldValue: originalValue,
            newValue: newValue,
            changeDate: new Date(),
            changeReason: 'Employee update',
            employeeId: req.params.id,
          };
        }
      })
      .filter(change => change); // Filter out undefined values

    if (changes.length > 0) {
      await EmployeeHistory.insertMany(changes);
    }

    res.status(200).json({ message: 'Employee data updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error while updating Employee: ' + error.message });
  }
};

