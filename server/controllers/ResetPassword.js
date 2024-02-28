 
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

//resetPasswordToken
exports.resetPasswordToken = async(req,res) =>{

try{

     //get email from req ki body
    const email = req.body.email;

    //check user for this email , email validation
    const user = User.findOne({email:email});
    if(!user){
        return res.json({
            success:false,
            message:'Your Email is not registered',
        })
    }
    
    //generate token 
    const token = crypto.randomUUID();

    //update user by additing token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
                               {email:email},
                               {
                                 token:token,
                                 resetPasswordExpires:Date.now() + 5 * 60 * 1000,
                                },{new:true})
   
     //create url
     const url = `http://localhost:3000/update-password/${token}`;

    //send mail conatining the url
    await mailSender(email,
                "Password Reset Link",
                `Password Reset Link: ${url}` )

    //return response 
    return res.json({
        success:true,
        message:'Email Sent Successully',
    })
    
}
catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'Something went wrong while reset password',
    })
}

}

//resetPassword
exports.resetPassword = async(req,res) =>{
 try{
          //data fetch
    const {password, confirmPassword, token} = req.body;

    //validation
    if(password !== confirmPassword){
        return res.json({
            succcess:false,
            message:"Password not matching",
        })
    }

    //get userdetails from db using token
    const userDetails = await User.findOne({token:token});

    //if no entry --invalid token
    if(!userDetails){
        return res.json({
            succcess:false,
            message:"Token Invalid",
        })
    }

    //token time check
    if(userDetails.resetPasswordExpires < Date.now()){
        return res.json({
            succcess:false,
            message:"Token is expired, please regenrate your token",
        })
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    
    //update the password 
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
    )
    //return response 
    return res.status(200).json({
        success:true,
        message:"Password reset successfully",
    })  
    }
 catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reset password',
        })
    }
}