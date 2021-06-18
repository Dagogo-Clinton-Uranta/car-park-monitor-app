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
  tagCounter: {type:String ,required:true},
  number: {type:Number ,required:true} 
  /*tagCounterC: [{type:String ,required:true}] ,
    tagCounterD: [{type:String ,required:true}] ,
    tagCounterE: [{type:String ,required:true}],
    tagCounterF: [{type:String ,required:true}] ,
    tagCounterG: [{type:String ,required:true}] , 
    tagCounterH: [{type:String ,required:true}] ,
    tagCounterR: [{type:String ,required:true}] */
        

},{timestamps:false /*you want a createdAt? you add timestamps:true*/})


const Product = mongoose.model('Product',productSchema)

/*the this Product you export, you set a new instance
 of it anytime you want to save it to database
 N.B MongoDB uses mongoose ORM/ODM unlinke SQL databases cuz
 sql databases come with a structure that you put in through a GUI*/

//exports.Product = Product
export default Product