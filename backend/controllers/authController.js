const bcrypt = require('bcrypt');
const Employee= require('../models/employeeModel.js');
const {generateTokenAndSetCookie} = require('../utils/generateToken.js');
const {formatDate}= require ('../utils/formatDate.js');
const Company = require('../models/companyModel.js');
const Admin = require('../models/adminModel.js');


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;
    const date = new Date(Date.now()); // Create a Date object from the current timestamp


    // Check if username exists in Employee model
    user = await Employee.findOne({ email }).populate('company','subDate');
    if (user) {
      
      const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      if(user.company.subDate <= date){
        return res.status(400).json({ error: 'Your account has been deactivated on: '+ formatDate(user.company.subDate )});
      }


      generateTokenAndSetCookie(user, res);
      res.status(200).json({
        user
      });
    } 
    else {
      // If not found in Employee model, check if it exists in Company model
      user = await Company.findOne({ email });
      if (user) {
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
        if (!isPasswordCorrect) {
          return res.status(400).json({ error: 'Invalid username or password' });
        }

        if(user.subDate <= date){
          return res.status(400).json({ error: 'Your account has been deactivated on: '+ formatDate(user.subDate) });
        }

        generateTokenAndSetCookie(user, res); 
        res.status(200).json({
          user
        });
      } 
      else {
        user= await Admin.findOne({email});
        if (user) {
        
          const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
          
          if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid username or password' });
          }
          generateTokenAndSetCookie(user, res);
          res.status(200).json({
           user
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



exports.logout=async (req,res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logout successfully"});
    } catch (err) {
        console.log("Error in logout controller:",err.message);
        res.status(500).json({error:"Internal Server Error: "+err.message});
    }
};

