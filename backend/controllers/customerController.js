const Customer = require('../models/customerModel');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');
const { compare } = require('bcrypt');

// show all customers
exports.showAll= async (req, res)=>{
    try{
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const loggedUser=await Employee.findById(decoded.userId);
        const customer= await Customer.find({company:loggedUser&&loggedUser.company?loggedUser.company:decoded.userId});
        res.status(200).json(customer);
    }catch(error){
        res.status(500).json({error:"Error while fetching customers: "+error.message});
    }
};


// create customer
exports. createCustomer= async(req, res)=>{
    try{
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const {custName, BillingAddress, city, state, country,email, DeliveryAddress, GSTNo, customerContactPersonName1, phoneNumber1, customerContactPersonName2, phoneNumber2}=req.body;
        const user = await Employee.findById(decoded.userId);

        const customer= await Customer.find({company:user ? user.company : decoded.userId, email:email});
        if(customer.length>0){
            return res.status(400).json("Customer already exist please use different email Id");
        }
        
        const newCust = Customer({
            custName,
            DeliveryAddress, 
            GSTNo,
            company:user&& user.company ? user.company:decoded.userId,
            email,
            createdBy: decoded.userId,
            customerContactPersonName1, 
            phoneNumber1, 
            customerContactPersonName2, 
            phoneNumber2
        });

        newCust.BillingAddress.add=BillingAddress.add;
        newCust.BillingAddress.city=BillingAddress.city;
        newCust.BillingAddress.state=BillingAddress.state;
        newCust.BillingAddress.pincode=BillingAddress.pincode;
        newCust.BillingAddress.country=BillingAddress.country;

        newCust.DeliveryAddress.add=DeliveryAddress.add;
        newCust.DeliveryAddress.city=DeliveryAddress.city;
        newCust.DeliveryAddress.state=DeliveryAddress.state;
        newCust.DeliveryAddress.pincode=DeliveryAddress.pincode;
        newCust.DeliveryAddress.country=DeliveryAddress.country;

        // if(user && user.company)
        //     newCust=user.company;
        // else
        //     newCust=decoded.userId;

        if(newCust){
            console.log("New customer Created");
            await newCust.save();
            res.status(201).json(newCust);
        }else{
            res.status(400).json({error:"Invalid customer data"});
        }
    }
    
    catch(error){
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message });
          } else {
            res.status(500).json({ error: 'Error creating customer: ' + error.message });
          }
    }
};

// delete customer 
exports.deleteCustomer=async(req,res)=>{
    try{
        const customer= await Customers.findByIdAndDelete(req.params.id);

        if(!customer){
            res.status(400).json({error:"Customer Not found !!"});
        }
        res.status(200).json({message:"Customer deleted successfully"});
    }catch(error){
        res.status(500).json({error:"Error while deleting customer: "+error.message});
    }
};

// update customer 
exports.updateCustomer= async(req,res)=>{
    try{
        const customer=await Customers.findByIdAndUpdate(req.params.id,req.body,{new:true});

        if(!customer){
            res.status(400).json({error:"Customer Not found !!"});
        }
    }catch(error){
        res.status(500).json({error:"Error while updating customer: "+error.message});
    }
};
