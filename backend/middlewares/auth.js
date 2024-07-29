const jwt = require('jsonwebtoken');
const Employee = require("../models/employeeModel");
const Company = require('../models/companyModel');
const Admin = require('../models/adminModel');

module.exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).json({ error: 'Unauthorized you need to login first' });
  }
  next();
};

module.exports.isCompany = async (req, res, next) => {

  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    // This is the company ID of the logged in user
    req.id = decoded.userId;
    const company = await Company.findById(req.id);
    if (req.id && company) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied. Companies only.' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports.isAdmin = async (req, res, next) => {

  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    // This is the employee ID of the logged in user
    req.userId = decoded.userId;
    const emp=await Admin.findById(req.userId);
  
    if (req.userId && emp) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token :'+err.message });
  }
};


module.exports.isDeveloper = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    // This is the employee ID of the logged in user
    req.id = decoded.userId;
    let emp=await Employee.findById(req.id);
    if (emp && emp.role.toLowerCase() === 'developer') {
      console.log("Developer is loggedIn");
      return next();
    } else {
      emp = await Company.findById(req.id);
      if(emp){
        console.log("Company is loggedIn");
        return next();
      }
      else
        return res.status(403).json({ error: 'Access denied. Developers only.' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports.isSales = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    // This is the employee ID of the logged in user
    req.id = decoded.userId;
    let emp=await Employee.findById(req.id);
    if (emp && emp.role.toLowerCase() === 'sales') {
      console.log("logged user is sales");
      return next();
    } else {
      emp=await Company.findById(req.id);
      if(emp){
        console.log("logged user is Company");
        return next();
      }
      else
        return res.status(403).json({ error: 'Access denied. Sales only.' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Error in auth isSales: '+err.message });
  }
};

module.exports.isManager = async (req, res, next) => {

  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    // This is the employee ID of the logged in user
    req.id = decoded.userId;
    let emp=await Employee.findById(req.id);
    if (emp && emp.role.toLowerCase() === 'manager') {
      console.log("Manager is LoggedIn");
      return next();
    } else {
      emp=await Company.findById(req.id);
      console.log(req.id);
      if(emp){
        console.log("Company is LoggedIn");
        return next();
      }
      else
        return res.status(403).json({ error: 'Access denied. Managers only.' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
