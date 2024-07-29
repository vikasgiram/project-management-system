const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    GST: String,
    Address:{
        add:String,
        city:String,
        state:String,
        country:String,
        pincode:String
    },
    admin:{
        type:String,
        required:true
    },
    mobileNo:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String, 
        required: true
    },
    subDate:{
        type:Date,
        default:Date.now,
    },
    subAmount:{
        type:Number,
    }
},{
    timestamps: true,
  });

const Company = mongoose.model('Company',companySchema);

module.exports = Company;