import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
//const Product = require('../models/productModel.js')
//const asyncHandler = require('express-async-handler')
import mongoose from 'mongoose'


//@desc  Fetch all products
//@route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const pageSize = 3 //i recommend 6 per page
     const page = Number(req.query.pageNumber) || 1

 const vendorName = req.query.vendorName  //if your vendorName logic is messing up, come and change it to resemble that of keyword, with the empty object
let count;
let products;

  const keyword = req.query.keyword ? {
   name: {
     $regex: req.query.keyword,
     $options:'i' // it means case insensitive 
   }
 
 }:{}
 
 // I am instructing my getProducts controller to tune it's search, based on if there's a vendor name or not 
 vendorName !==''?(
   count = await Product.countDocuments({...keyword, vendor:vendorName}), 
  products = await Product.find({...keyword, vendor:vendorName}).limit(pageSize).skip(pageSize *(page-1))) :
(count = await Product.countDocuments({...keyword}),
products = await Product.find({...keyword}).limit(pageSize).skip(pageSize *(page-1)))


  res.json({products,page,pages:Math.ceil(count/pageSize)})
})



//@desc  Fetch single product
//@route GET /api/products/:id
//@access Publiccount
const getProductById = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  /*const objectId = new mongoose.Types.ObjectId(req.params.id)*/
  const product = await Product.find({})
  
  if(product){res.json(product)}
   else{ res.status(404) /*with the custom error handler, if you dont put a res.status, it'll be 500 by default, and you don't have to res.json anymore, it'll just be handled, if yo throw a new error ? please study error handlers */
   throw new Error('Tagcounters not found')}
})


//@desc  Delete a product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const product = await Product.findById(objectId)
  if(product){
    await product.remove()
    res.json({message:'Product removed'})
                                    }
   else{ res.status(404) /*with the custom error handler, if you dont put a res.status, it'll be 500 by default, and you don't have to res.json anymore, it'll just be handled, if yo throw a new error ? please study error handlers */
   throw new Error('Product not found')}
})


//@desc  Create a product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
   const product = new Product({
     name: 'Sample name',
     price: 0,
     user:req.user._id,
     image:'/images/sample.jpeg',
     brand:"Sample brand",
     category:'Sample category',
     countInStock:0,
     numReviews:0, /*is it reviews or num reviews  */
     description:'Sample Description',
     vendor:'Sample Vendor'
   })

   const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})


//@desc  update a product
//@route PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const {name,price,description,image,category,countInStock} = req.body

  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const product= await Product.findById(objectId)

   if(product){
      product.name = name
      product.price  = price
      product.description=description
      product.category = category
      product.brand = brand
      product.countInStock = countInStock
      product.image = image

     const updatedProduct = await product.save()
     res.status(201).json(updatedProduct)
   }else{
     res.status(404)
     throw new Error('Product not found')
   }

})




//@desc  Create new review
//@route POST /api/products/:id/review
//@access Private/Admin
const createProductReview = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const {rating,comment} = req.body
  console.log(req.body)
  console.log(req.user.name)
  
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const product= await Product.findById(objectId)

   if(product){
      const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

      if(alreadyReviewed){
        res.status(400)
        throw new Error('Product already reviewed')}
         
        let numberRating 

        switch(rating){
          case'1': numberRating = 1
          break;
          case'2': numberRating = 2
          break;
          case'3': numberRating = 3
          break;
          case'4': numberRating = 4
          break;
          case'5': numberRating = 5
          default:5
        }

      const review ={
        name:req.user.name,
        comment,
        rating:Number(req.body.rating),
        user:req.user._id
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length
      const formingNewAverage = product.reviews.map((item) =>{item.rating})

      /*consider changing this check to not use == , but rather ===*/ 
      product.rating = formingNewAverage==false?Number(rating):Number(formingNewAverage.reduce((acc,item) =>{item + acc},0)/product.reviews.length)
      console.log(formingNewAverage)
      await product.save()

      res.status(201).json({message:'Review added'})

   }else{
     res.status(404)
     throw new Error('Product not found')
   }

})


//@desc  Get top rated products
//@route GET /api/products/top
//@access Public
const getTopProducts = asyncHandler(async (req,res)=>{
   res.header("Access-Control-Allow-Origin","*")
  const products = await Product.find({}).sort({rating:-1}).limit(3)
  res.json(products)
})


export {getProducts, getProductById,deleteProduct, createProduct, updateProduct, createProductReview ,getTopProducts}
//exports.getProducts = getProducts
//exports.getProductById = getProductById
//exports.deleteProduct = deleteProduct
//exports.createProduct = createProduct
//exports.updateProduct = updateProduct
//exports.createProductReview = createProductReview
//exports.getTopProducts = getTopProducts