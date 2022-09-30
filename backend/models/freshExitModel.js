import mongoose from 'mongoose'
import bcrypt from  'bcryptjs'
//const mongoose= require('mongoose')
//const bcrypt= require('bcryptjs')

const Schema = mongoose.Schema
//the use of "Schema" on it's own below is simply the use of the constant above, i later changed it to bypass this constant
const freshExitSchema =  mongoose.Schema({

        bookingNumber:{type: String },
  truckCategory:{type: String },
  containerNumber:{type: String },
  truckNumber:{type: String },
  entryTime:{type: String },
  exitDate:{type: String },
  exitTime:{type: String },
  entryDate:{type: String },
  parkZone:{type: String },
  tagNumber:{type: String}
        
},{timestamps:true /*you want a createdAt? you add timestamps:true*/})



const FreshExit = mongoose.model('FreshExit',freshExitSchema)

/*the this User you export, you set a new instance
 of it anytime you want to save it to database
 */


export default FreshExit