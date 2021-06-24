import mongoose from 'mongoose'
import bcrypt from  'bcryptjs'
//const mongoose= require('mongoose')
//const bcrypt= require('bcryptjs')

const Schema = mongoose.Schema
//the use of "Schema" on it's own below is simply the use of the constant above, i later changed it to bypass this constant
const freshExitSchema =  mongoose.Schema({

        truckNumber:{type: String ,required:true},
        bookingNumber:{type: String ,required:true},
        containerNumber:{type: String ,required:true},
        truckCategory:{type: String ,required:true}
        
},{timestamps:true /*you want a createdAt? you add timestamps:true*/})



const FreshExit = mongoose.model('FreshExit',freshExitSchema)

/*the this User you export, you set a new instance
 of it anytime you want to save it to database
 */


export default FreshExit