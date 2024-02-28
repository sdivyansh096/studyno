const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//sendOTP
exports.sendOTP = async(req,res)=>{
    
    //fetch email from req ki body
    try{
        const {email} = req.body;
  
        //check if user already exist
        const checkUserPresent = await User.findOne({email});
        
        // if user already exits , then return a response
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"user already regitered"
            })
        }

        // generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("otp generated ",otp);

        //check unique otp or not
        let result = await OTP.findOne({otp:otp}); 

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp:otp}); 
        }

        // create a payload to insert in db
        const otpPayload = {email,otp};
        
        // create an entry in db for otp
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // retrun response successfully

         res.status(200).json({
            success:true,
            message:"OTP sent succesfully",
            otp,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};


//signup
exports.signUp = async(req, res) => {

   try{
         //data fetch from request ki body
    const {
        firstName,
        lastName , 
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    } = req.body

    //validate krlo data
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"All fields are required",
        })
    }

    //2 password aur confirm ko match krlo
    if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"password and confirmassword are not same",
        })
    }
    
    //check user already exits or not
    const existingUser = await User.findOne({email});
    if(existingUser){
    return res.status(400).json({
        success:false,
        message:"User is already registered",
    });
   }

    // find most recent otp stored for the user
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(recentOtp);
    // validate otp
    if(recentOtp.length == 0){
        //OTP not found
        return res.status(400).json({
            success:false,
            message:"OTP not found || invalid",
        })
    } else if(recentOtp[0].otp!==otp){
        //Invalid otp
        return res.status(400).json({
            success:false,
            message:"OTP not matching",
        })
    }
    
    //Hash password
    const hashedPassword = await bcrypt.hash(password,10);

    //centry create in db

    // create profile (using Profile model) so that we can add User in db
    const profileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    })
    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType:accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })

    //return res
    return res.status(200).json({
        success:true,
        message:"User registered Sucessfully",
        user,
    })
   }
   catch(error){
     console.log(error);
     return res.status(500).json({
        success:false,
        message:"user cannot be registered please try again",
     })
   }
}   

//login
exports.login = async(req,res)=>{
    try{
        //get data from req ki body
        const {email,password} = req.body;

        //validate the data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required, please try again",
             })  

        }

        // check whethere user exists or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registeres please Singup",
             })
        }

        //generate JWT ,after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

     

        //create cookie send response
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,   
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged in successully",
        }) 
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is inncorrect",
             })  
        }
    }
    catch(error){
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Login Failure, please try again",
     })
    }
};

//changePassword
exports.changePassword = async(req,res) => {
    //get data from req body
    //get oldPassword, newPassword, confirmNewpassword
    //validation

    //update password in db
    //send mail -- Password updated
    //return response
}