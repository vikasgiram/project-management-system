const Role = require('../models/roleModel');
const jwt = require('jsonwebtoken');

exports.showAll = async ( req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt,process.env.JWT_SECRET);
        const roles= await Role.find({company:decoded.user.company?decoded.user.company:decoded.user._id});
        if(roles.length<=0){
          return res.status(400).json({ error: 'No Roles Found ' });
        }
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({error:"Error while Getting Roles: "+error.message});
    }
};

exports.create = async (req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const {name, department, permissions}= req.body;
        const newRole = await Role({
            name,
            department,
            company:decoded.user._id,
            permissions,
        });

        if(newRole){
            await newRole.save();
            res.status(200).json({newRole});
        }
    } catch (error) {
        res.status(500).json({error:"Error while Creating Role: "+ error.message});
    }
};

exports.update = async ( req, res)=>{
    try {
        const role= await Role.findByIdAndUpdate(req.params.id,req.body,{ new: true });

        if(!role){
            return res.status(400).json({error:"Role not found"});
        }
      
        res.status(200).json({role});
        
    } catch (error) {
        res.status(500).json({error: "Error while Updating Role: "+error.message});
    }
}

exports.delete = async (req, res)=>{
    try {
        const role= await Role.findByIdAndDelete(req.params.id);
        if(!role){
            return res.status(400).json({error:"Role not found "});
        }
        res.status(200).json({role});
    } catch (error) {
        res.status(500).json({error:"Error while Deleting Role: "+error.message});
    }
}