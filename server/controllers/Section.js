// const Section = require("../models/Section");
// const Course = require("../models/Course");

// exports.createSection = async (req,res) => {
//     try{
//         //data fetch
//         const {sectionName, courseId} = req.body;

//         //data validation
//         if(!sectionName || !courseId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Missing properties",
//             });
//         }

//         //create section
//         const newSection = await Section.create({sectionName});

//         //update course with section ObjectId
//         const updatedCourseDetails = await Course.findByIdAndUpdate(
//             courseId,
//             {
//                 $push:{
//                     courseContent:newSection._id,
//                 }
//             },
//             {new:true},
//         )  .populate({
// 				path: "courseContent",
// 				populate: {
// 					path: "subSection",
// 				},
// 			})
// 			.exec();

//         //HW: use populate to replace section subsection both in the updatedCourseDetails
//         //return response
//         return res.status(200).json({
//             success:true,
//             message:"Section Created Successfully",
//             updatedCourseDetails,
//         });
//     }
//     catch(error){
//         return res.status(400).json({
//             success:false,
//             message:"Unable to create Section, please try again",
//             error:error.message,
//         });
//     }
// }

// //update the section
// exports.updateSection = async(req,res) => {
//     try{
//         //data input
//         const {sectionName, sectionId} = req.body;

//         //data validation
//         if(!sectionName || !sectionId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Missing properties",
//             });
//         }

//         //update the data
//         const section = await Section.findByIdAndUpdate(
//             {sectionId},
//             {sectionName},{new:true}
//         );

//         //return response
//         return res.status(200).json({
//             success:true,
//             message:"Section updated successfully",
//         });
//     }
//     catch(error){
//         return res.status(400).json({
//             success:false,
//             message:"Unable to update Section, please try again",
//         });
//     }
// }

// //delete the section
// exports.deleteSection = async (req,res)=>{
//     try{
//         //get id --assuming that we are sending id in our prarams
//         const {sectionId} = req.params;

//         //use findByIdAndDelete
//         await Section.findByIdAndDelete(sectionId);

//         //TODO : delete the section from course
//         //return response
//         return res.status(200).json({
//             success:true,
//             message:"Section Deleted Successfully",
//         });
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Unable to delete Section, please try again",
//         });
//     }
// }
const Section = require("../models/Section");
const Course = require("../models/Course");
// CREATE a new section
exports.createSection = async (req, res) => {
  try {
    // Extract the required properties from the request body
    const { sectionName, courseId } = req.body;

    // Validate the input
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    const ifcourse = await Course.findById(courseId);
    if (!ifcourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Create a new section with the given name
    const newSection = await Section.create({ sectionName });

    // Add the new section to the course's content array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Return the updated course object in the response
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// UPDATE a section
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;
    console.log(sectionName, sectionId);
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();
    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE a section
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    await Section.findByIdAndDelete(sectionId);
    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();
    res.status(200).json({
      success: true,
      message: "Section deleted",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
