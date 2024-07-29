const bcrypt = require('bcrypt');
const Employee= require('../models/employeeModel.js');
const {generateTokenAndSetCookie} = require('../utils/generateToken.js');
const Company = require('../models/companyModel.js');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel.js');

exports.signup=async (req, res) => {
    try {
      const {empName, empMobileNo, hourlyRate,role, email, password, confirmPassword}=req.body;
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
        role:role.toLowerCase(),
        company:decoded.userId,
        email:email,
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


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;

    // Check if username exists in Employee model
    user = await Employee.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
      generateTokenAndSetCookie(user.id, res);
      const token = req.cookies.jwt;
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token:token


      });
    } 
    else {
      // If not found in Employee model, check if it exists in Company model
      user = await Company.findOne({ email });
      if (user) {
        const date = new Date(Date.now()); // Create a Date object from the current timestamp
        
        if(user.subDate <= date){
          return res.status(400).json({ error: 'Your account has been deactivated on:'+user.subDate });
        }
        if(!user.subDate >= date){
          return res.status(400).json({error:"your Subscription ended "});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
        if (!isPasswordCorrect) {
          return res.status(400).json({ error: 'Invalid username or password' });
        }
        generateTokenAndSetCookie(user.id, res); // assuming companyId is the field in Company model
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } 
      else {
        user= await Admin.findOne({email});
        if (user) {
        
          const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
          
          if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid username or password' });
          }
          generateTokenAndSetCookie(user.id, res);
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
          });
        }
        else
          return res.status(400).json({ error: 'Invalid username or password' });
      }
    }
  } catch (err) {
    console.log("Error in login controller: ", err.message);
    res.status(500).json({ error: "Internal Server Error: "+err.message });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await findUser(email);
//     if (!user) {
//       return generateErrorResponse(res, 400, "Invalid username or password");
//     }
//     const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
//     if (!isPasswordCorrect) {
//       return generateErrorResponse(res, 400, "Invalid username or password");
//     }
//     await generateTokenAndRespond(user, res);
//   } catch (err) {
//     generateErrorResponse(res, 500, "Internal Server Error");
//   }
// };

exports.logout=async (req,res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logout successfully"});
    } catch (err) {
        console.log("Error in logout controller:",err.message);
        res.status(500).json({error:"Internal Server Error: "+err.message});
    }
};

/*
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const generateErrorResponse = (res, error, message) => {
  res.status(error).json({ error: message + ": " + error.message });
};

const findUser = async (email) => {
  let user;
  user = await Employee.findOne({ email });
  if (!user) {
    user = await Company.findOne({ email });
    if (!user) {
      user = await Admin.findOne({ email });
    }
  }
  return user;
};

const generateTokenAndRespond = async (user, res) => {
  generateTokenAndSetCookie(user.id, res);
  const token = req.cookies.jwt;
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token,
  });
};
*/