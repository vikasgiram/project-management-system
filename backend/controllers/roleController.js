const Role = require('../models/roleModel');
const jwt = require('jsonwebtoken');

exports.showAll = async ( req, res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt,process.env.JWT_SECRET);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1)*limit;

        const roles= await Role.find({company:decoded.user.company?decoded.user.company:decoded.user._id})
        .skip(skip)
        .limit(limit);

        if(roles.length<=0){
          return res.status(400).json({ error: 'No Roles Found ' });
        }

        const totalRecords= await Role.countDocuments({company:decoded.user.company?decoded.user.company:decoded.user._id});

        res.status(200).json({
            roles,
            currentPage:page,
            totalPages:Math.ceil(totalRecords/limit),
            totalRecords
        });
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