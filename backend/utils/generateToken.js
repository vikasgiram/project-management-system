const jwt = require('jsonwebtoken');

exports.generateTokenAndSetCookie=(userId,res)=>{
    console.log("Cookies set: "+userId);
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });

    res.cookie("jwt",token,{
        maxAge: 15* 24* 60* 60* 1000, // milisecond 
        httpOnly: true,
        sameSite: "strict",
        secure: process.env !== 'development'
    });
};
