const jwt = require('jsonwebtoken');

const Employee= require('../models/employeeModel.js');
const Company = require('../models/companyModel.js');
const Admin = require('../models/adminModel.js');

const {formatDate}= require ('../utils/formatDate.js');
const { comparePassword, changePassword, validateEmail } = require('../utils/login.js');
const { sendMail } = require('../utils/email.js');
const {generateTokenAndSetCookie, resetTokenLink, verifyResetToken} = require('../utils/generateToken.js');


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;
    const date = new Date(Date.now()); // Create a Date object from the current timestamp


    // Check if username exists in Employee model
    user = await Employee.findOne({ email }).populate('company','subDate');
    if (user) {

      if (!(await comparePassword(user,password))) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      if(user.company.subDate <= date){
        return res.status(400).json({ error: 'Your account has been deactivated on: '+ formatDate(user.company.subDate )});
      }


      generateTokenAndSetCookie(user, res);
      res.status(200).json({
        user: "employee",
        name:user.name
      });
    } 
    else {
      // If not found in Employee model, check if it exists in Company model
      user = await Company.findOne({ email });
      if (user) {
        
        if (!(await comparePassword(user,password))) {
          return res.status(400).json({ error: 'Invalid username or password' });
        }

        if(user.subDate <= date){
          return res.status(400).json({ error: 'Your account has been deactivated on: '+ formatDate(user.subDate) });
        }

        generateTokenAndSetCookie(user, res); 
        res.status(200).json({
          name:user.name,
          user: "company"
        });
      } 
      else {
        user= await Admin.findOne({email});
        if (user) {
          if (!(await comparePassword(user,password))) {
            return res.status(400).json({ error: 'Invalid username or password' });
          }
          generateTokenAndSetCookie(user, res);
          res.status(200).json({
            name:user.name,
            user: "admin"
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

exports.changePassword = async (req, res)=>{
  try {
    const {oldPass, newPass} = req.body;
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const [employee, company, admin] = await Promise.all([
      Employee.findById(decoded.user._id),
      Company.findById(decoded.user._id),
      Admin.findById(decoded.user._id)
    ]);

    const user = employee || company || admin;

    if(user){

      if(await comparePassword(user, oldPass)){
        changePassword(res,user, newPass);
      }else{
        return res.status(400).json({error:"Wrong Password..."});
      }
    }else{
      return res.status(400).json({error:"User not found..."});
    }

  } catch (error) {
    res.status(500).json({error:"Error while changing password: "+error.message});
  }
};

exports.forgetPassword = async (req, res)=>{
  try {
    const {email}=req.body;
  
    if(!email || !validateEmail(email)){
      return res.status(400).json("Invalid Email...");
    }
    
    const [employee, company, admin] = await Promise.all([
      Employee.findOne({ email }),
      Company.findOne({ email }),
      Admin.findOne({email},)
    ]);

    const user = employee || company || admin;

    if (!user) {
      return res.status(400).json({ error: "User not found..." });
    }

    const link = resetTokenLink(user);
    sendMail(res,user,link);
  } catch (error) {
    console.log("Error in the forget-password: "+error.message);
    res.status(500).json({ error: "Error while sending reset password link: " + error.message });
  }
};


exports.resetPassword = async (req, res)=>{
  try {
    const {id,token}=req.params;
    const {password, confirmPassword}=req.body;

    const [employee, company, admin] = await Promise.all([
      Employee.findById(id),
      Company.findById(id),
      Admin.findById(id)
    ]);

    const user = employee || company || admin;

    if(user){
      if(verifyResetToken(user,token)){
        if(confirmPassword===password){
          return changePassword(res,user,password);
        }
        else{
          return res.status(400).json({error:"Password dosen't match "});
        }
      }
      else{
        return res.status(400).json({error:"Link Expired..."});
      } 
    }
    else{
      return res.status(400).json({error:"User not found..."});
    }
  } catch (error) {
    res.status(500).json({error:"Error while reseting password: "+error.message});
  }
};


exports.logout=async (req,res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logout successfully"});
    } catch (err) {
        console.log("Error in logout controller:",err.message);
        res.status(500).json({error:"Internal Server Error: "+err.message});
    }
};

