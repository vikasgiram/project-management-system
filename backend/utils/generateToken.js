const jwt = require('jsonwebtoken');

exports.generateTokenAndSetCookie=(user,res)=>{
    console.log("Cookies set: "+user);
    const token=jwt.sign({user},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });

    res.cookie("jwt",token,{
        maxAge: 15* 24* 60* 60* 1000, // milisecond 
        httpOnly: true,
        sameSite: "strict",
        secure: process.env !== 'development'
    });
};
