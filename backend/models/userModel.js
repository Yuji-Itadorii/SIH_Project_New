const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const {Schema} = mongoose

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

connectToDb();
const userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'teacher'],
        required: true
    },
    interests: {
        type: [String],
        default: []
    },
    education: {
        type: String,
        enum : ['school', 'college', 'working'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    institution: {
        type: String,
        required: true
    }
})


// userSchema.pre('save', async function(next) {
//     const user = this;
  
//     try {
//       if (!user.isModified('password')) {
//         return next();
//       }
  
//       // Generate a salt and hash the password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(user.password, salt);
//       user.password = hashedPassword;
//       next();
//     } catch (error) {
//       return next(error);
//     }
//   });

module.exports = mongoose.model('userModel', userSchema)