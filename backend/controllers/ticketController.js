const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Customer = require('../models/customerModel');
const Ticket = require('../models/ticketModel');
const { sendConfirmationMail } = require('../utils/sendTicketConfirmationMail');


exports.showAll = async (req,res)=>{
    try {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const tickets = await Ticket.find({company:decoded.user.company}).populate('registerBy','name');   
        console.log(tickets);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        if(tickets.length<=0){
          return res.status(400).json({message:"No Tickets Avaliavle"});
        }
        res.json(tickets);
    } catch (error) {
        res
      .status(500).json({
        error: "Error while featching the Tickets : " + error.message,
      });
    }
}

exports.update = async (req,res)=>{
    try {
        const {id}= req.params;
        const {clientName, Address, details, product, contactPerson, contactNumber, source} = req.body;
        const updatedData={
            clientName,
            Address,
            details,
            product,
            contactPerson,
            contactNumber,
            source,
        }
        const ticket= await Ticket.findByIdAndUpdate(id, updatedData, { new: true });
        if(!ticket){
            return res.status(400).json({error:"Ticket not found..."});
        }

        res.status(200).json({message:"Ticket Updated..."});
    } catch (error) {
        res
      .status(500).json({
        error: "Error while Updating the Ticket : " + error.message,
      });
    }
}

exports.create= async(req, res)=>{
    try {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const {client, Address, details, product, contactPerson, contactNumber, source} = req.body;
        console.log(decoded);
        const ticket = new Ticket({
            company: decoded.user.company,
            client,
            Address,
            details,
            product,
            contactPerson,
            contactNumber,
            source,
            registerBy: decoded.user._id,

        });
        await ticket.save();
        console.log(ticket);
        sendConfirmationMail(ticket._id);
        res.status(201).json({message:"Ticket Created Successfully..."});
    } catch (error) {
        res
      .status(500).json({
        error: "Error while Creating the Ticket : " + error.message,
      });
    }
}

exports.delete = async (req, res)=>{
    try {
        const {id} = req.params;
        const ticket = await Ticket.findByIdAndDelete(id);
        if(!ticket){
            return res.status(400).json({error:"Ticket not found..."});
        }
        res.status(200).json({message:"Ticket Deleted Successfully..."});
    } catch (error) {
        res
      .status(500).json({
        error: "Error while deleting the Ticket: " + error.message,
      });
    }
}
