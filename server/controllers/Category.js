const Category = require("../models/Category");
const User = require("../models/User");

//create Cateogry ka handler function
 exports.createCategory = async(req,res) =>{
    try{
        //fetch data
        const {name,description} = req.body;
        
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
               }) 
        }

        //create entry in db
        const CategoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(CategoryDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"cateogry created Successfully",
           }) 
    }
    catch(error){
       return res.status(500).json({
        success:false,
        message:error.message,
       }) 
    }
 };

 //get all category handler function

 exports.showAllCategories = async (req,res) =>{
    try{
        // find all category
        const allCategory = await Category.find({},{name:true,description:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"All cateogries return succssfully",
            data:allCategory,
           }) 
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
           }) 
    }
 }

 //categoryPageDetails

 exports.categoryPageDetails = async (req, res) =>{
    try{

        //get category id
        const {categoryId} = req.body;

        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
        .populate("courses").exec();

        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data Not Found",
            })
        }
        	// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

        //get courses for different catgeory
        const differentCategory = await Category.find(
            {
                _id: {$ne: categoryId},
            })
        .populate("courses")
        .exec();

        //get top 10 selling courses
        //HW - write ot on your own
        const allCategories = await Category.find().populate({path:"courses",match:{status:"Published"},populate:([{path:"instructor"},{path:"ratingAndReviews"}])});
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

        
        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
            },
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
 }