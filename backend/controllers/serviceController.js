const Service = require('../models/serviceModel');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/ticketModel');

exports.showAll = async (req,res)=>{
    try{
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const services = await Service.find({company:decoded.user._id}).populate('allotTo','name');
        if(services.length<=0){
            return res.status(400).json({message:"No Services Available"});
        }
        res.json(services);
    }
    catch(error){
        res.status(500).json({error:"Error while fetching the Services : "+error.message});
    }
}

exports.update = async (req,res)=>{
    try{
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id}= req.params;
        const {serviceType, priority, zone, allotmentDate, allotTo, workMode, status, completionDate, remarks } = req.body;
        const updatedData={
            serviceType,
            priority,
            zone,
            allotmentDate,
            allotTo,
            workMode,
            status,
            completionDate,
        
        }
        const service= await Service.findByIdAndUpdate(id
            , updatedData, { new: true });

        service.remarks.push(remarks);
        if(status==="Completed"){
            service.days=moment(completionDate).diff(allotmentDate, 'days');
            // send feedback to link through email
            sendMail(id);
        }
        await service.save();   

        if(!service){
            return res.status(400).json({error:"Service not found..."});
        }
        res.status(200).json({message:"Service Updated..."});
    }
    catch(error){
        res.status(500).json({error:"Error while Updating the Service : "+error.message});
    }
}

exports.create= async(req, res)=>{
    try{
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {serviceType, ticket, priority, zone, allotmentDate, allotTo, workMode, status} = req.body;
        const service = new Service({
            company: decoded.user.company,
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
        res.status(200).json({message:"Service Created..."});
    }
    catch(error){
        res.status(500).json({error:"Error while Creating the Service : "+error.message});
    }
}

exports.delete= async(req, res)=>{
    try{
        const {id}= req.params;
        const service= await Service.findByIdAndDelete(id);
        if(!service){
            return res.status(400).json({error:"Service not found..."});
        }
        res.status(200).json({message:"Service Deleted..."});
    }
    catch(error){
        res.status(500).json({error:"Error while Deleting the Service : "+error.message});
    }
}

const sendMail=(id)=> {
    // Add your email sending logic here
    const service = Service.findById(id);
    const ticket = Ticket.findById(service.ticket).populate("clientName", 'email');

    const ticketDetails ={
        ticketId:ticket._id,
        raisedDate: ticket.date,
        resolvedDate: service.completionDate,
        resolutionDetails: service.remarks[service.remarks.length-1],
        feedbackLink: 'https://your-feedback-link.com' // need to create feedback link
    }
    sendFeedbackMail(ticket.clientName.email, ticketDetails);
};