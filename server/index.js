const express = require("express");
const app = express();


const userRoute = require("./routes/User");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");
const courseRoute = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const fileUpload = require("express-fileupload");

const { cloudinaryConnect } = require("./config/cloudinary");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
       origin:"http://localhost:3000",
       credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);


//cloudinary connection
cloudinaryConnect();

//routes mount
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/payment",paymentRoute);

//default route
app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Welcome to the API",
      });
});

//listen
app.listen(PORT,(req,res)=>{
    console.log(`App is running at ${PORT}`);
})