const Customer = require("../models/customerModel");
const Project = require("../models/projectModel");
const Role = require("../models/roleModel");
const TaskSheet = require("../models/taskSheetModel");
const jwt = require("jsonwebtoken");


exports.dashboard= async(req , res)=>{
    try {
        const decoded = jwt.verify(req.cookies.jwt,process.env.JWT_SECRET);
        const role=await Role.findById(decoded.user.role);
        const permission=role.permissions;
        const dashboardData={};
        if(permission.includes('viewCustomer')){
            dashboardData.customer=await Customer.find({company:decoded.user.company});
        }
        if(permission.includes('viewTask')){
            dashboardData.task= await TaskSheet.find({company:decoded.user.company});
        }
        if(permission.includes('viewProject')){
            console.log("You have permission to view project");
            dashboardData.project=await Project.find({company:decoded.user.company});
        }
        res.status(200).json(dashboardData);
    } catch (error) {
        res.status(500).json({error:"Error In dashborad controller: "+error.message});
    }
}
