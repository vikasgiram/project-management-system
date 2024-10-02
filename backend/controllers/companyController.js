const Company = require('../models/companyModel');
const bcrypt = require('bcrypt');
const Customer = require('../models/customerModel');
const Project = require('../models/projectModel');
const Employee = require('../models/employeeModel');
const Department = require('../models/departmentModel');
const TaskSheet = require('../models/taskSheetModel');
const Designation = require('../models/DesignationModel');
const CompanyHistory = require('../models/companyHistoryModel');

exports.showAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const companies = await Company.find({ password: 0 }).skip(skip).limit(limit);

    if (companies.length <= 0) {
      return res.status(400).json({ error: "No company found" });
    }

    const totalRecords = await Company.countDocuments();
    res.status(200).json({
      companies,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
    });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching companies: " + error.message });
  }
};

exports.getCompany = async (req, res)=>{
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if(!company){
      return res.status(400).json({error:"Company not found"});
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({error:"Error in getCompany: "+error.message});
  }
};

exports.createCompany= async (req, res)=>{
    try {
      const {name, email, GST, Address, admin, mobileNo,logo, password, subDate,subAmount, confirmPassword} = req.body;
  
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
        email:email.toLowerCase(),
        subAmount:subAmount,
        GST:GST,
        admin:admin,
        mobileNo:mobileNo,
        password:hashPassword,
        subDate:new Date(subDate),
        logo,
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

      if(!company){
          res.status(404).json({error:"Company not found"});
      }

      await Customer.deleteMany({ company: req.params.id });
      await Project.deleteMany({ company: req.params.id });
      await Employee.deleteMany({ company: req.params.id });
      await Department.deleteMany({ company: req.params.id });
      await Designation.deleteMany({ company: req.params.id });
      await TaskSheet.deleteMany({company:req.params.id});
      res.status(200).json({message:"Company Deleted Sucessfully: "+company.email});

    } catch (error) {
        res.status(500).json({error:"Error in while Deleting Company: "+error.message});
    }
};

exports.updateCompany = async (req, res) => {
  try {
    const originalValue = Company.findById(req.params.id);
    const updateData = {};
    for (const key in req.body) {
      if (key !== 'email') {
        // If department or any other nested object, extract only the _id
        if (key === 'department') {
          updateData[key] = req.body[key]._id; // Extract only the _id
        } else {
          updateData[key] = req.body[key];
        }
      }
    }

    const company = await Company.updateOne({ _id: req.params.id }, { $set: updateData }, { upsert: false });

    if (!company) {
      res.status(404).json({ error: "Company not found" });
    }
    
    // Log changes to history (you can implement this similar to the employee history logging)
    const changes = Object.keys(updateData)
      .map(key => {
        const newValue = updateData[key];

        // Only log changes if values are different
        if (JSON.stringify(originalValue) !== JSON.stringify(newValue)) {
          return {
            fieldName: key,
            oldValue: originalValue,
            newValue: newValue,
            changeDate: new Date(),
            changeReason: 'Company update',
            companyId: req.params.id,
          };
        }
      })
      .filter(change => change); // Filter out undefined values

    if (changes.length > 0) {
      await CompanyHistory.insertMany(changes);
    }

    res.status(200).json({ message: "Company data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while updating company data: " + error.message });
  }
};
