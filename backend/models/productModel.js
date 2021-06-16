import mongoose from 'mongoose'
//const mongoose= require('mongoose')

const Schema = mongoose.Schema
/*const reviewSchema = mongoose.Schema({
  name:{type: String ,required:true},
  rating:{type: Number ,required:true},
  comment:{type: String ,required:true},
  user:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'User'}
}, {timestamps:true})*/

const productSchema =  mongoose.Schema({
  tagCounterA: {type:Number ,required:true} ,
  tagCounterB: {type:Number ,required:true} ,
  tagCounterC: {type:Number ,required:true} ,
    tagCounterD: {type:Number ,required:true} ,
    tagCounterE: {type:Number ,required:true} ,
    tagCounterF: {type:Number ,required:true} ,
    tagCounterG: {type:Number ,required:true} , //will it be count in stock per vendor, i think it will be, it makes sense, so that you can go pick another vendor when your stock is over.
    tagCounterH: {type:Number ,required:true} ,
    tagCounterR: {type:Number ,required:true} 
        

},{timestamps:false /*you want a createdAt? you add timestamps:true*/})


const Product = mongoose.model('Product',productSchema)

/*the this Product you export, you set a new instance
 of it anytime you want to save it to database
 N.B MongoDB uses mongoose ORM/ODM unlinke SQL databases cuz
 sql databases come with a structure that you put in through a GUI*/

//exports.Product = Product
export default Product