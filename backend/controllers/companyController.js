const Company = require('../models/companyModel');
const bcrypt = require('bcrypt');

exports.showAll = async (req, res) =>{
    try {
        const company = await Company.find();
        res.status(200).json(company);
        
    } catch (error) {
        res.status(500).json({error:"Error while fetching employees: " + error.message })
    }
};

exports.createCompany= async (req, res)=>{
    try {
      const {name, email, GST, Address, admin, mobileNo, password, subDate,subAmount, confirmPassword} = req.body;
  
      if(password !== confirmPassword){
        return res.status(400).json({error:`Password desen't match!!!`});
      }
      const company = await Company.findOne({email});
      if(company){
        console.log("Company already exists");
        console.log(company);
        return res.status(400).json({error:"Company already exists"});
      }
      const salt=await bcrypt.genSalt(10);
      const hashPassword=await bcrypt.hash(password,salt);
      
      const newComp=Company({
        name:name,
        email:email,
        subAmount:subAmount,
        GST:GST,
        admin:admin,
        mobileNo:mobileNo,
        password:hashPassword,
        subDate:subDate,
      });

      newComp.Address.add=Address.add;
      newComp.Address.city=Address.city;
      newComp.Address.state=Address.state;
      newComp.Address.pincode=Address.pincode;
      newComp.Address.country=Address.country;

      if(newComp){
        console.log("Company Created:");
        await newComp.save();
        res.status(200).json(newComp);
      }
      else{
        res.status(400).json({error:"Invalid Company Data!!!"});
      }
    }catch(error){
      res.status(400).json({error:"Error in company Controller: "+error.message});
    }
  };

exports.deleteCompany = async (req, res)=>{
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        console.log(company);
        if(!company){
            res.status(404).json({error:"Company not found"});
        }
        res.status(200).json({message:"Company Deleted Sucessfully: "+company.email});
    } catch (error) {
        res.status(500).json({error:"Error in while Deleting Company: "+error.message});
    }
};

exports.updateCompany = async (req, res)=>{
    try {
        const updateData={};
        for(const key in req.body){
            if(key !== 'email' && key !== 'password'){
                updateData[key]=req.body[key];
            }
        }
        const company = await Company.updateOne({ _id: req.params.id }, { $set: updateData }, { upsert: false });
        // const company = await Company.findByIdAndUpdate(req.params.id, {$set: updateData}, {new: true});

        if(!company){
            res.status(404).json({error:"Company not found"});  
        }
        res.status(200).json({message:"Company Data Updated Sucessfully: "+company.email});
    } catch (error) {
        res.status(500).json({error:"Error while updating Company Data: "+error.message});
    }
};