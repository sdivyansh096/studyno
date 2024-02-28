const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//createRating
exports.createRating = async(req,res)=>{
    try{

        //get user id
        const userId = req.user.id;

        //fetchdata from req body
        const {rating, review, courseId} = req.body;

        //check if user is erolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
            studentEnrolled: {$elemMath: {$eq: userId} },
            });
            
        //if data not found
          if(!courseDetails){
                return res.status(404).json({
                    success:false,
                    message:"User is not enrolled in the course",
                }) 
            }

        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviwed by the user",
            })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId,
        })

        //update course with rating review
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    RatingAndReviews:ratingReview._id,
                }
            },
            {new:true},
        )
        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review create Successfully",
            ratingReview,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAverageRating
exports.getAverageRating = async (req,res) =>{
    try{

        //get courseId
        const courseId = req.body.courseId;

        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
                {
                    $group:{
                        _id:null,
                        averageRating: {$avg: "rating"},
                    }
                }
        ])

        //return response
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0],
            })
        }
        // if no rating review exists
        return res.status(200).json({
            success:true,
            message:"Average rating is 0, no rating given till now",
            averageRating:0,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAllRatingandReviews
exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({ratng:"desc"})
        .populate({
            path:"user",
            select:"firstName lastname email image"
        })
        .populate({
            path:"course",
            select:"courseName",
        })
        .exec();
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"",
        })
    }
}
