const jwt = require('jsonwebtoken');

const Feedback = require('../models/feedbackModel');
const Service = require('../models/serviceModel');



exports.showAll = async (req,res)=>{
    try {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        if(!token){
            return res.status(403).json({ error: 'Unauthorized you need to login first' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const feedbacks = await Feedback.find({company:decoded.user.company? decoded.user.company: decoded.user._id}).populate('service');

       if(feedbacks.length<=0){
            return res.status(400).json({message:"No Feedbacks Available"});
       }
        res.status(200).json(feedbacks);
    } catch (error) {
        res
      .status(500).json({
        error: "Error while featching the Feedbacks: " + error.message,
      });
    }
}



exports.create= async(req, res)=>{
    try {
        const {rating, message, service} = req.body;
        const exestingService = await Service.findById(service);
        if(!exestingService){
            return res.status(400).json({error:"Invalid Ticket"});
        }
        if(exestingService.feedback){
            return res.status(400).json({error:"Feedback already given for this ticket"});
        }
        // console.log(rating, message, service);
        const newFeedback = await Feedback({
            rating,
            message,
            service,
            company: exestingService.company
        });

        exestingService.feedback = newFeedback._id;

        await newFeedback.save();
        await exestingService.save();        
        res.status(200).json({message:"Thank you for your valueable feedback"});
    } catch (error) {
        console.log("Error while creating Feedback: "+error);
        res
      .status(500).json({
        error: "Invalid Link..." ,
      });
    }
}

