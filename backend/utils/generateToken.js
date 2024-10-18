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


exports.resetTokenLink=(user)=>{
    const secret= process.env.JWT_SECRET+user.password;
    const payload = {
        email: user.email,
        id:user._id
    }
    const token = jwt.sign(payload, secret,{ expiresIn: '15m' });
    
    const link=`http://localhost:3000/api/reset-password/${user._id}/${token}`;
    return link;
};

exports.verifyResetToken=(user,token)=>{
    try {
        const secret = process.env.JWT_SECRET+user.password;
        const payload = jwt.verify(token,secret);
        return true;
    } catch (error) {   
        return false;
    }
};
