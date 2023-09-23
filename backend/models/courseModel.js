const mongoose=require('mongoose');
const mongo_URI = 'mongodb+srv://vaibhavbajpai:securepassword@cluster0.sibgrep.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
const connectToDb = async()=>{
    try{
        await mongoose.connect(mongo_URI)
        console.log('COURSE DB connected successfuly')
    }catch(err){
        console.log(`MongoDB error : ${err}`)
    }
}
connectToDb();
const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        maxlenght:[20,'plan name should not exceed more than 20 characters']
    },
    subtitle:{
      type:String,
      maxlenght:[10000,'subtiltes should not exceed more than 10000 characters']
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    ratingsAverage:{
        type:Number
    },
    urlimg:{
       type:String,
       default:'img/users/default.jpeg'
    },
    reviewscount:{
       type:Number,
       default:0
    },
    courseurl:{
        type:String,
        default:''
    },
    domain:{
          type:String
    }

});
//model
const courseModel=mongoose.model('courseModel',courseSchema);




module.exports=courseModel;