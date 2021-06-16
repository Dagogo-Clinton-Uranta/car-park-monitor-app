import mongoose from 'mongoose'
import colors from 'colors'
//const mongoose  = require('mongoose ')
//const colors  = require('colors')

const connectDB = async ()=> {

     try{
const conn= await mongoose.connect(process.env.MONGO_URI,{
       useUnifiedTopology:true,
       useNewUrlParser:true,
       useCreateIndex:true
  })
    console.log(`Connected Successfully to database:
      ${conn.connection.host}`.cyan.underline)
     }
     catch(error){
       console.error(`Error:${error.message}`.red.underline.bold)
       process.exit(1) /*it means that it quits the process
       with failure. 1 is failure, study this*/
     }
}

//exports.connectDB =connectDB
export default connectDB