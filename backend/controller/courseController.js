const courseModel=require("../models/courseModel");


// abhi ismein rating ko shi se implement karna rhta hai
module.exports.getAllCourses=async function getAllCourses(req,res){
    try{
        let courses=await courseModel.find();
        if(courses){
            return res.json({
                message:"all courses retrieved",
                data:courses,
            });
        }else{
            return res.json({
                message:"courses not found",
            });
        }
    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}

module.exports.getCourse=async function getCourse(req,res){
   try {
    let id=req.params.id;
    let course= await courseModel.findById(id);
    if(course){
        return res.json({
               message:"course reteieved",
               data:course

        });
    }
    else{
        return res.json({
            message:"course not found"
        })
    }

   } catch(err){
    res.status(500).json({
        message:err.message,
    });
}

}

module.exports.postCourse=async function postCourse(req,res){
    try{
        let course=req.body;
        // course.reviewscount=course.reviewscount+1;

        let postCourse=await courseModel.create(course);
        return res.json({
            message:'course created successfully',
            data:postCourse
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}




module.exports.deleteCourse=async function deleteCourse(req,res){
    try{
        let id=req.params.id;
        let deletedCourse=await courseModel.findByIdAndDelete(id);
        return res.json({
            message:'course deleted successfully',
            data:deletedCourse
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}



module.exports.updateCourse=async function(req,res){
    try{
        let id=req.params.id;
        let dataToBeUpdated=req.body;
        console.log(id);
        console.log(dataToBeUpdated);
        let keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        
        let course=await courseModel.findById(id);
        for(let i=0;i<keys.length;i++){
            course[keys[i]]=dataToBeUpdated[keys[i]];
        }
        console.log(course);
        //documen t aur document ko .save hota hai
        await course.save();
      return res.json({
            message:'course updated successfully',
            data:course
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


//get top 3 courses
module.exports.top3Course=async function top3Courses(req,res){ 
       try{
      const courses=await courseModel.find().sort({
        ratingsAverage:-1
      }).limit(3);
      return res.json({
        message:'top3 courses',
        data:courses
      })
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}