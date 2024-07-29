const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');


exports.getAdmin = async (req, res)=>{
    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({error:"Error while featching Admins: "+error.message});
    }
};

exports.admin = async (req, res)=>{
    try {
      const {name, email, password, confirmPassword}= req.body;
      if(password !== confirmPassword){
        return res.status(400).json({error:"Password doesn't match!!!"});
      }
      const adm = await Admin.findOne({email});
      if(adm){
        return res.status(400).json({error:"Admin already exists!!!"});
      }
      const salt=await bcrypt.genSalt(10);
      const hashPassword=await bcrypt.hash(password,salt);
  
      const user = await Admin({
        name:name,
        email:email,
        password:hashPassword,
      });
  
      if(user){
        console.log("Admin Created:");
        await user.save();
        res.status(201).json(user);
      }
      else{
        res.status(400).json({error:"Invalid Admin Data!!!"});
      }
      
    } catch (error) {
      res.status(500).json({error:"Error while creating super admin: "+error.message});
    }
  };


  exports.deleteAdmin = async (req, res)=>{
    try {
        const admin=await Admin.findByIdAndDelete(req.params.id);

        console.log(admin);
        if(!admin){
            res.status(400).json({error:"Admin not found!!!"});
        }
        res.status(200).json({message:admin.email+" deleted sucessfully"})
    } catch (error) {
        res.status(500).json({error:"Error while deleting admin"});
    }
  };