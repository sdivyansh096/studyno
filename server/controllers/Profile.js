// const Profile = require("../models/Profile");
// const User = require("../models/User");

// //update profile (as we have already created a dummy profile which is empty)
// exports.updateProfile = async(req,res) =>{
//     try{

//         //get data
//         const {dateOfBirth="",about="",contactNumber, gender} = req.body;

//         //get userId
//         const id = req.user.id;

//         //validate
//         if(!contactNumber || !gender || !id){
//             return res.status(400).json({
//                 success:false,
//                 message:"All fields are required",
//             });
//         }

//         //find the profile
//         const userDetails = await User.findById(id);
//         const profileId = userDetails.additionalDetails;
//         const profileDetails = await Profile.findById(profileId);

//         //update the profile
//         profileDetails.dateOfBirth = dateOfBirth;
//         profileDetails.about = about;
//         profileDetails.gender = gender;
//         profileDetails.contactNumber = contactNumber;

//         //saved in db
//         await profileDetails.save();

//         //return the response
//         return res.status(200).json({
//             success:true,
//             message:"Profile Updated Successfully",
//             profileDetails,
//         });
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Error in updating Profile",
//             error:error.message,
//         });
//     }
// }

// //deleteAccount
// //Explore -> how can we schedule this deletion operation
// exports.deleteAccount = async(req,res)=>{
//     try{
//         //get id
//         const id = req.user.id;

//         //validation
//         const userDetails = await User.findById(id);
//         if(!userDetails){
//             return res.status(404).json({
//                 success:false,
//                 message:"User not found",
//             });
//         }

//         //delete the profile
//         await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

//         //HW: unenroll user from all enrolled courses
//         //delete user
//         await User.findByIdAndDelete({_id:id});

//         //return response
//         return res.status(200).json({
//             success:true,
//             message:"User Deleted Successfully",
//         });
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"User cannot be deleted",
//         });
//     }
// }

// //get userDetails
// exports.getAllUserDetails = async (req,res) =>{
//     try{

//         //get id
//         const id = req.user.id;

//         //validation and get user details
//         const userDetails = await User.findById(id).populate("additionalDetails").exec();

//         //return response
//         return res.status(200).json({
//             success:true,
//             message:"User Data fetched Successfully",
//             userDetails,
//         });
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"error while get the user data",
//             error:error.message,
//         });
//     }
// }

const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      firstName,
      lastName,
      gender = "",
    } = req.body;
    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    // Update the profile fields
    userDetails.firstName = firstName || userDetails.firstName;
    userDetails.lastName = lastName || userDetails.lastName;
    profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
    profile.about = about || profile.about;
    profile.gender = gender || profile.gender;
    profile.contactNumber = contactNumber || profile.contactNumber;

    // Save the updated profile
    await profile.save();
    await userDetails.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      profile,
      userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    // TODO: Find More on Job Schedule
    // const job = schedule.scheduleJob("10 * * * * *", function () {
    // 	console.log("The answer to life, the universe, and everything!");
    // });
    // console.log(job);
    const id = req.user.id;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({ _id: user.additionalDetails });
    // TODO: Unenroll User From All the Enrolled Courses
    // Now Delete User
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "User Cannot be deleted successfully",
        error: error.message,
      });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const enrolledCourses = await User.findById(id)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
        },
      })
      .populate("courseProgress")
      .exec();
    // console.log(enrolledCourses);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: enrolledCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const image = req.files.pfp;
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    const uploadDetails = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    console.log(uploadDetails);

    const updatedImage = await User.findByIdAndUpdate(
      { _id: id },
      { image: uploadDetails.secure_url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedImage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//instructor dashboard
exports.instructorDashboard = async (req, res) => {
  try {
    const id = req.user.id;
    const courseData = await Course.find({ instructor: id });
    const courseDetails = courseData.map((course) => {
      totalStudents = course?.studentsEnrolled?.length;
      totalRevenue = course?.price * totalStudents;
      const courseStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudents,
        totalRevenue,
      };
      return courseStats;
    });
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
