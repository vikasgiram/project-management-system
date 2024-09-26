const Customer = require('../models/customerModel');
const jwt = require('jsonwebtoken');




exports.getCustomer = async (req, res)=>{
    try {
        const  customer = await Customer.findById(req.params.id);
        if(!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);

    } catch (error) {
        res.status(500).json({error:"Error in getting a customer: "+error.message});
    }
};

// show all customers with pagination
// end point /customers?page=1&limit=10
exports.showAll = async (req, res) => {
    try {
      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const customer = await Customer.find({ company: decoded.user.company ? decoded.user.company : decoded.user._id })
        .skip(skip)
        .limit(limit);
  
      if (customer.length <= 0) {
        return res.status(400).json({ error: "No Customer Found" });
      }
  
      const count = await Customer.countDocuments({ company: decoded.user.company ? decoded.user.company : decoded.user._id });
  
      res.status(200).json({
        customers: customer,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalRecords: count,
      });
    } catch (error) {
      res.status(500).json({ error: "Error while fetching customers: " + error.message });
    }
  };


// create customer
exports. createCustomer= async(req, res)=>{
    try{
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const {custName, billingAddress,email, deliveryAddress, GSTNo, customerContactPersonName1, phoneNumber1, customerContactPersonName2, phoneNumber2}=req.body;

        const customer= await Customer.find({company:decoded.user.company?decoded.user.company:decoded.user._id, email:email});
        if(customer.length>0){
            return res.status(400).json("Customer already exist please use different email Id");
        }

        console.log("billing address:",billingAddress);
        console.log("delevery address:",deliveryAddress);
        
        const newCust = Customer({
            custName,
            GSTNo,
            company:decoded.user.company?decoded.user.company:decoded.user._id,
            email:email.toLowerCase(),
            createdBy: decoded.user._id,
            customerContactPersonName1, 
            phoneNumber1, 
            customerContactPersonName2, 
            phoneNumber2,
            deliveryAddress,
            billingAddress
        });

        // if(user && user.company)
        //     newCust=user.company;
        // else
        //     newCust=decoded.userId;

        if(newCust){
            console.log("New customer Created");
            await newCust.save();
            console.log(newCust);
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
        const customer= await Customer.findByIdAndDelete(req.params.id);

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
        const customer=await Customer.findByIdAndUpdate(req.params.id,req.body,{new:true});

        if(!customer){
            return res.status(400).json({error:"Customer Not found !!"});
        }
        res.status(200).json({message:"Customer Update sucessfully"});
    }catch(error){
        res.status(500).json({error:"Error while updating customer: "+error.message});
    }
};
