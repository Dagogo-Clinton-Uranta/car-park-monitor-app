import mongoose from 'mongoose'
//const mongoose= require('mongoose')

const Schema = mongoose.Schema

const parkedTruckSchema = mongoose.Schema({
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
}, {timestamps:false})

const productSchema =  mongoose.Schema({
  tagCounter: {type:String ,required:true},
  parkedTrucks: [parkedTruckSchema], 
  occupiedSpaces: {type:Number ,required:true, default:0}, 
  currentFreeSpace: {type:Number ,required:true, default:1}   

},{timestamps:false })


const Product = mongoose.model('Product',productSchema)

/*the this Product you export, you set a new instance
 of it anytime you want to save it to database
 N.B MongoDB uses mongoose ORM/ODM unlinke SQL databases cuz
 sql databases come with a structure that you put in through a GUI*/

//exports.Product = Product
export default Product