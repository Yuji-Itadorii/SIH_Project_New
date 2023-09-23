const mongoose = require('mongoose')

const mongo_URI = 'mongodb+srv://vaibhavbajpai:securepassword@cluster0.sibgrep.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

const connectToDb = async()=>{
    try{
        await mongoose.connect(mongo_URI)
        console.log('DB connected successfuly')
    }catch(err){
        console.log(`MongoDB error : ${err}`)
    }
}

module.exports = connectToDb