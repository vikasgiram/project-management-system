const bcrypt = require('bcrypt');

const Company = require('../models/companyModel');
const Customer = require('../models/customerModel');
const Project = require('../models/projectModel');
const Employee = require('../models/employeeModel');
const Department = require('../models/departmentModel');
const TaskSheet = require('../models/taskSheetModel');
const CompanyHistory = require('../models/companyHistoryModel');
const Admin = require('../models/adminModel');
const Designation = require('../models/designationModel');
const {bucket} = require('../utils/firebase');

exports.showAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const companies = await Company.find({}, { password: 0 }).skip(skip).limit(limit);

    if (companies.length <= 0) {
      console.log(companies);
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
      const {name, email, GST, admin, mobileNo, Address, password, logo, subDate,subAmount, confirmPassword} = req.body;
      
      const existAdmin = await Admin.findOne({email});
      const emp= await Employee.findOne({email});
      if(existAdmin || emp){
        return res.status(400).json({error:"Email already exists"});
      }
      if(password !== confirmPassword){
        return res.status(400).json({error:`Password desen't match!!!`});
      }
      
      if(!Address){
        return res.status(400).json({error:"Address Required..."});
      }
      const address=JSON.parse(Address);
      
      const company = await Company.findOne({email});
      if(company){
        console.log("Company already exists");
        console.log(company);
        return res.status(400).json({error:"Company already exists"});
      }
      const salt=await bcrypt.genSalt(10);
      const hashPassword=await bcrypt.hash(password,salt);

      let logoUrl=null;

      if(logo && logo.length >0){
        const fileName = `logos/${name}_${Date.now()}`; // Create a unique file name
        const file = bucket.file(fileName);

        const buffer = Buffer.from(logo, 'base64');

        // Upload the file to Firebase Storage
        await file.save(buffer, {
            metadata: { contentType: 'image/png' },
        });

        // Make the file publicly accessible
        await file.makePublic();

        // Get the public URL of the uploaded logo
        logoUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      }
      
      const newComp=Company({
        name:name,
        email:email.toLowerCase(),
        subAmount:subAmount,
        GST:GST,
        admin:admin,
        mobileNo:mobileNo,
        password:hashPassword,
        subDate:new Date(subDate),
        logo:logoUrl,
        Address:address
      });


      if(newComp){
        console.log("Company Created:");
        await newComp.save();
        res.status(200).json(newComp);
      }
      else{
        res.status(400).json({error:"Invalid Company Data!!!"});
      }
    }catch(error){
      console.log(error);
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
    const { id } = req.params;
    const updatedData = req.body;

    // Find the existing company record
    const existingCompany = await Company.findById(id);
    console.log(updatedData);
    console.log(existingCompany);
    if (!existingCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }


    // Array to hold history records for changed fields
    const historyRecords = [];

    // Define fields to ignore during comparison
    const ignoredFields = ['_id', 'createdAt', 'updatedAt', 'logo'];

    // Iterate over the fields and compare changes
    Object.keys(updatedData).forEach((key) => {
      // Skip ignored fields
      if (ignoredFields.includes(key)) {
        return;
      }

      if (key === 'subDate') {
        // Convert the incoming value to a Date object for comparison
        const newSubDate = new Date(updatedData[key]);
        const existingSubDate = new Date(existingCompany[key]);

        // Compare the two Date objects
        if (existingSubDate.getTime() !== newSubDate.getTime()) {
          historyRecords.push({
            companyId: id,
            fieldName: key,
            oldValue: existingCompany[key],
            newValue: updatedData[key],
            changeReason: req.body.changeReason || 'Updated via company edit'
          });
        }
      } else if (typeof updatedData[key] === 'object' && updatedData[key] !== null) {
        // If it's a nested object like Address, compare its properties
        Object.keys(updatedData[key]).forEach((nestedKey) => {
          if (existingCompany[key] && existingCompany[key][nestedKey] !== updatedData[key][nestedKey]) {
            historyRecords.push({
              companyId: id,
              fieldName: `${key}.${nestedKey}`, // Indicate nested field
              oldValue: existingCompany[key][nestedKey],
              newValue: updatedData[key][nestedKey],
              changeReason: req.body.changeReason || 'Updated via company edit'
            });
          }
        });
      } else {
        // For non-object fields, directly compare values
        if (existingCompany[key] !== updatedData[key]) {
          historyRecords.push({
            companyId: id,
            fieldName: key,
            oldValue: existingCompany[key],
            newValue: updatedData[key],
            changeReason: req.body.changeReason || 'Updated via company edit'
          });
        }
      }
    });

    // If there are changes, insert them into the CompanyHistory collection
    if (historyRecords.length > 0) {
      console.log('History Records:', historyRecords);
      await CompanyHistory.insertMany(historyRecords);
    }

    // Update the company record
    await Company.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: 'Company updated successfully' });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ message: 'Server error' });
  }
};