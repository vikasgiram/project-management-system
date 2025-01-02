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
        const {rating, comment, service} = req.body;
        const exestingService = await Service.findById(service);
        if(!exestingService){
            return res.status(400).json({message:"Invalid Ticket"});
        }
        if(exestingService.feedback){
            return res.status(400).json({message:"Feedback already given for this ticket"});
        }
        const newFeedback = await Feedback({
            rating,
            comment,
            service,
            company: exestingService.company
        });

        exestingService.feedback = newFeedback._id;

        await exestingService.save();        
        await newFeedback.save();
        res.status(200).json({message:"Thank you for your valueable feedback"});
    } catch (error) {
        console.log("Error while creating Feedback: "+error);
        res
      .status(500).json({
        error: "Invalid Link..." ,
      });
    }
}

