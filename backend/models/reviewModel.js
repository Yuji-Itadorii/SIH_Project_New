const mongoose=require('mongoose');
const mongo_URI = 'mongodb+srv://vaibhavbajpai:securepassword@cluster0.sibgrep.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
//wdekhna hai abhi ki course wala kaise connect hua hoga
const connectToDb = async()=>{
    try{
        await mongoose.connect(mongo_URI)
        console.log('COURSE DB connected successfuly')
    }catch(err){
        console.log(`MongoDB error : ${err}`)
    }
}
connectToDb()


const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true,'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
//ab hum chahte hain ki humara user plan ko dekhe aur usk lie apna review likhe 
//toh humein innn teenon ko jodna HOGA toh hum user aue course k refrences le lete hain idhar
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'review must belong to user']
    },
    course:{
        type:mongoose.Schema.ObjectId,
        ref:'courseModel',
        required:[true,'review must belong to course']
    }

});

//hook used
//idhar yeh /^find/ regex hai matlab ki agar koi bhi function find se similar mtlb findById,findOne chle toh pehle yeh populate kar aayo
//pehle user model mein name aur profileimage populate kar aao fir course ko pura populate kr aao
//fir apna function chala lo find,findbyid wagerah ka
reviewSchema.pre(/^find/,function(next){
    this
    .populate({
        path:"user",
        select:"name profileImage"
    })
    .populate("course");
    next();
});


const reviewModel=mongoose.model('reviewModel',reviewSchema);
module.exports=reviewModel;