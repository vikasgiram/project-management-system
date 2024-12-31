const Service = require("../models/serviceModel");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const Ticket = require("../models/ticketModel");
const {ticketProcessMail} = require('../utils/ticketProcessMail');

exports.showAll = async (req, res) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ error: "Unauthorized you need to login first" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const services = await Service.find({ company: decoded.user.company ? decoded.user.company : decoded.user._id })
      .populate("allotTo", "name")
      .populate({
        path: "ticket",
        select: "details product date client",
        populate: {
          path: "client",
          select: "custName", 
        },
      });
    if (services.length <= 0) {
      return res.status(400).json({ message: "No Services Available" });
    }
    res.json(services);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching the Services : " + error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ error: "Unauthorized you need to login first" });
    }
    const { id } = req.params;
    const {
      serviceType,
      priority,
      zone,
      allotmentDate,
      allotTo,
      workMode,
      status
    } = req.body;
    const updatedData = {
      serviceType,
      priority,
      zone,
      allotmentDate,
      allotTo,
      workMode,
      status
    };
    const service = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
    });


    await service.save();

    if (!service) {
      return res.status(400).json({ error: "Service not found..." });
    }
    res.status(200).json({ message: "Service Updated..." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while Updating the Service : " + error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ error: "Unauthorized you need to login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {
      serviceType,
      ticket,
      priority,
      zone,
      allotmentDate,
      allotTo,
      workMode,
      status,
    } = req.body;
    const ticketData = await Ticket.findById(ticket);
    const service = new Service({
      company: decoded.user.company ? decoded.user.company : decoded.user._id,
      serviceType,
      ticket,
      priority,
      zone,
      allotmentDate,
      allotTo,
      workMode,
      status,
    });
    await service.save();
    ticketData.service = service._id;
    await ticketData.save();
    // send ticket allotment mail here
    console.log("Service Created sending Mail...");
    ticketProcessMail(service._id);
    res.status(200).json({ message: "Service Created..." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while Creating the Service : " + error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(400).json({ error: "Service not found..." });
    }
    res.status(200).json({ message: "Service Deleted..." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while Deleting the Service : " + error.message });
  }
};

exports.myServices = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ error: "Unauthorized you need to login first" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const services = await Service.find({ allotTo: decoded.user._id })
      .populate("allotTo", "name")
      .populate({
        path: "ticket",
        select: "details product date client contactPerson contactNumber Address",
        populate: {
          path: "client",
          select: "custName",
        },
      });
    if (services.length <= 0) {
      return res.status(400).json({ message: "No Services Available" });
    }
    res.json(services);
  
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching the employee Services : " + error.message });
    
  }
}

exports.submitWork= async(req,res)=>{
  try{
    const {id}=req.params;
    const {status, completionDate, remarks }=req.body;
    const service=await Service.findById(id);
    if(!service){
      return res.status(400).json({error:"Service not found..."});
    }
    service.status=status;
    service.remarks.push(remarks);
    if(status==="Completed"){
      service.completionDate=completionDate;
      service.days=moment(completionDate).diff(service.allotmentDate, "days");
      service.actualCompletionDate=new Date();

      // send feedback to link through email
    }

    await service.save();
    res.status(200).json({message:"Work Submitted..."});
  }
  catch(error){
    res.status(500).json({error:"Error while submitting the work : "+error.message});
  }
}
