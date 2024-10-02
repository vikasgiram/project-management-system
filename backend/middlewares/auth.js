const jwt = require('jsonwebtoken');
const Company = require('../models/companyModel');
const Admin = require('../models/adminModel');
const { formatDate } = require('../utils/formatDate');
const Designation = require('../models/DesignationModel');


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
    const company = await Company.findById(decoded.user._id);
    if (company) {
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
    const user=await Admin.findById(decoded.user._id);
  
    if (user) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token :'+err.message });
  }
};

module.exports.permissionMiddleware = (permissions) => {
  return async (req, res, next) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const user = await Company.findById(decoded.user._id);

    const date = new Date(Date.now()); // Create a Date object from the current timestamp

    if(user){
      // check sub
      if(user.subDate <= date){
        return res.status(400).json({ error: 'Your account has been deactivated on: '+ formatDate(user.subDate )});
      }
      return next();
    }
    const company= await Company.find(decoded.user.company);
    if(company.subDate <= date){
      return res.status(400).json({ error: 'Your account has been deactivated on: '+ formatDate(company.subDate )});
    }
    const designation= await Designation.findById(decoded.user.designation);

    const employeePermissions = designation.permissions; 
    const hasPermissions = permissions.every((permission) => {
      return employeePermissions.includes(permission);
    });

    if (!hasPermissions) {
      return res.status(403).json({ error: 'You do not have the required permissions' });
    }

    next(); // if employee has the required permissions, continue to the next middleware
  };
};

