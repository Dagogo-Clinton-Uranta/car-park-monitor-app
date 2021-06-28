import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

//const Order = require('../models/orderModel.js')
//const asyncHandler = require('express-async-handler')
import asyncHandler from 'express-async-handler'

//const colors  = require('colors')
import mongoose from 'mongoose'
import FreshExit from '../models/freshExitModel.js'

//@desc  find if the truck is already in the park, then add it to the long term log, the find the first free space in the park, replace it with the truck's details.
//@route POST /api/orders
//@access Public

const addOrderItems = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const {bookingNumber,truckCategory,truckNumber, containerNumber,entryTime, entryDate, parkZone, tagNumber} = req.body

  const truckExists = await Product.findOne({tagCounter:parkZone},{parkedTrucks:{$elemMatch:{bookingNumber:bookingNumber}}/*,createdAt:1,time:1*/},{ useFindAndModify: false})

  if(truckExists.parkedTrucks.length === 0){
   const order = new Order({
     
    bookingNumber,truckCategory,truckNumber, containerNumber,entryTime, entryDate, exitTime:'not exited', exitDate:'not exited', parkZone, tagNumber
   })

   
   const createdOrder = await Order.create(order)
   const carParkSpaces = await Product.findOne({tagCounter:parkZone},{parkedTrucks:{_id:0}}) 

   const freeSpace = carParkSpaces.parkedTrucks.findIndex(function(e){return e.bookingNumber === "empty"})

  carParkSpaces.parkedTrucks[freeSpace] = createdOrder

  const occupada = carParkSpaces.parkedTrucks.filter(function(e){return e.bookingNumber !== "empty"}).length

  const updatedFreeSpace = carParkSpaces.parkedTrucks.findIndex(function(e){return e.bookingNumber === "empty"})

  const buggy = await Product.findOneAndUpdate({tagCounter:parkZone},{parkedTrucks:carParkSpaces.parkedTrucks,occupiedSpaces:occupada , currentFreeSpace:updatedFreeSpace +1},{ useFindAndModify: false })
  res.json({instruction:'Do not allow further printing'})
  
  /*await User.deleteMany()*/
  }else{
   /*res.status(201).json(createdOrder)*/
    res.json({instruction:"A truck with this booking number is already in the park, ticket will not be valid"})
  }
  
     
})


//@desc find the truck in the park, replace it with a free space, then update the long term log with exit time and date
//@route POST /api/orders/update
//@access Public
const updateParkAndLog = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const {bookingNumber,truckCategory,truckNumber, containerNumber,entryTime, entryDate,exitTime, exitDate, parkZone, tagNumber} = req.body

  await Order.findOneAndUpdate({bookingNumber:bookingNumber},{exitTime:exitTime, exitDate:exitDate},{ useFindAndModify: false })

  const truckExists = await Product.findOne({tagCounter:parkZone},{parkedTrucks:{$elemMatch:{bookingNumber:bookingNumber}}/*,createdAt:1,time:1*/},{ useFindAndModify: false})
  console.log(truckExists)

  if(truckExists.parkedTrucks.length === 1){
  
   const carParkSpaces = await Product.findOne({tagCounter:parkZone},{parkedTrucks:{_id:0}}) 

   const truckPosition = carParkSpaces.parkedTrucks.findIndex(function(e){return e.bookingNumber === bookingNumber})
    
   /*console.log(truckPosition)*/
   

  carParkSpaces.parkedTrucks[truckPosition] = {bookingNumber:"empty"}

  const occupada = carParkSpaces.parkedTrucks.filter(function(e){return e.bookingNumber !== "empty"}).length
  
  /*console.log(carParkSpaces.parkedTrucks)*/

  const updatedFreeSpace = carParkSpaces.parkedTrucks.findIndex(function(e){return e.bookingNumber === "empty"})

  await Product.findOneAndUpdate({tagCounter:parkZone},{parkedTrucks:carParkSpaces.parkedTrucks,occupiedSpaces:occupada,currentFreeSpace:updatedFreeSpace + 1},{ useFindAndModify: false })
  /*res.json({instruction:'Do not allow further printing'})*/
  
  await FreshExit.deleteMany()
  }else{
   /*res.status(201).json(createdOrder)*/
    res.status(404)/*.json({instruction:"The truck with this booking number is not in the park, an exit ticket cannot be printed"})*/
    throw new Error("The truck with this booking number is not in the park, an exit ticket cannot be printed")
  }
  
     
})

//@desc  Get order by ID
//@route GET /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
   console.log(req.params.id)
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const order = await Order.findById(objectId)/*name and email in the same quotation */
  if(order){
    console.log(order)
    res.json(order)
  }
  else{
    res.status(404)
    throw new Error('Order not found')
  }
})


//@desc  Update order to paid
//@route GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const order = await Order.findById(objectId)
  if(order){
     order.isPaid = true
     order.paidAt = Date.now()
     order.paymentResult = {
      id: req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address: req.body.payer.email_address
     }
     const updatedOrder = await order.save()

     res.json(updatedOrder)
  }
  else{
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc  Update order to paid
//@route GET /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const order = await Order.findById(objectId)
  if(order){
     order.isDelivered = true,
     order.deliveredAt = Date.now()

     const updatedOrder = await order.save()

     res.json(updatedOrder)
  }
  else{
    res.status(401)
    throw new Error('Order not found')
  }
})




//@desc  get logged in user orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const orders = await Order.find({user:req.user._id})
  res.json(orders)
})

//@desc  get all orders
//@route GET /api/orders
//@access Private Admin
const getOrders = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")

  let orders

   /*const vendorName = req.query.vendorName
   vendorName !==''?(
   orders = await Order.find({'orderItems.vendor':vendorName}).populate('user','id name')):*/
   
     orders = await Order.find({})
   
  res.json(orders)
})

//@desc  update the merchant's quantity they can deliver
//@route PATCH /api/orders
//@access Private
const updatePromisedQty = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const { orderId, productId, updatedQty } =  await req.body
  if(req.body){console.log(req.body)}
  else{console.log('nothing dey o')}

  const orderObjectId = new mongoose.Types.ObjectId(orderId)
  const productObjectId = new mongoose.Types.ObjectId(productId)
 
  await Order.findOneAndUpdate({'_id':orderObjectId,'orderItems.product':productObjectId},{$set:{'orderItems.$.promisedQty': updatedQty } }, { useFindAndModify: false})
 /*await specificOrder*/
 /*res.json(orders)*/
})

export {addOrderItems, updateParkAndLog, getOrderById, updateOrderToPaid,
updateOrderToDelivered, getMyOrders,getOrders, updatePromisedQty}

//exports.addOrderItems =addOrderItems
//exports.getOrderById =getOrderById
//exports.updateOrderToPaid =updateOrderToPaid
//exports.updateOrderToDelivered = updateOrderToDelivered
//exports.getMyOrders =getMyOrders
//exports.getOrders =getOrders