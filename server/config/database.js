const mongoose = require("mongoose");
 require("dotenv").config();

 exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("connected to mongodb successfully");
    })
    .catch((error)=>{
        console.log("db connected failure");
        console.log(error);
        process.exit(1 )
    })
 }