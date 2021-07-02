import mongoose from 'mongoose'
import bcrypt from  'bcryptjs'
//const mongoose= require('mongoose')
//const bcrypt= require('bcryptjs')

const Schema = mongoose.Schema
//the use of "Schema" on it's own below is simply the use of the constant above, i later changed it to bypass this constant
const userSchema =  mongoose.Schema({

        truckNumber:{type: String ,required:true},
        bookingNumber:{type: String ,required:true},
        containerNumber:{type: String ,required:true},
        truckCategory:{type: String ,required:true},
         entryTime:{type: String },
        entryDate:{type: String},
        exitDate:{type: String, default:'not exited'},
        exitTime:{type: String,default:'not exited'},
        parkZone:{type: String},
        tagNumber:{type: Number}
        
},{timestamps:true /*you want a createdAt? you add timestamps:true*/})



const User = mongoose.model('User',userSchema)

/*the this User you export, you set a new instance
 of it anytime you want to save it to database
 */


export default User