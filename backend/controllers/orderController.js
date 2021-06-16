import Order from '../models/orderModel.js'
//const Order = require('../models/orderModel.js')
//const asyncHandler = require('express-async-handler')
import asyncHandler from 'express-async-handler'

//const colors  = require('colors')
import mongoose from 'mongoose'

//@desc  create new order
//@route POST /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const {orderItems,shippingAddress,paymentMethod, itemsPrice, taxPrice, deliveryCost, totalPrice} = req.body

 if(orderItems && orderItems.length === 0 ){
   res.status(400)
   throw new Error('No order items')
    return
 } else {
   const order = new Order({
     orderItems,
     user:req.user._id, //this will give us the currently logged in user
     shippingAddress,
     /*paymentMethod,*/
     itemsPrice,
     /*taxPrice,*/
     deliveryCost,
     totalPrice
   })

   
   const createdOrder = await Order.create(order)
    
   console.log(createdOrder)
     
    res.status(201).json(createdOrder)
 }
})


//@desc  Get order by ID
//@route GET /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
   console.log(req.params.id)
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const order = await Order.findById(objectId).populate('user', 'name email') /*name and email in the same quotation */
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

   const vendorName = req.query.vendorName
   vendorName !==''?(
   orders = await Order.find({'orderItems.vendor':vendorName}).populate('user','id name')):
   (
     orders = await Order.find({}).populate('user','id name')
   )
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

export {addOrderItems, getOrderById, updateOrderToPaid,
updateOrderToDelivered, getMyOrders,getOrders, updatePromisedQty}

//exports.addOrderItems =addOrderItems
//exports.getOrderById =getOrderById
//exports.updateOrderToPaid =updateOrderToPaid
//exports.updateOrderToDelivered = updateOrderToDelivered
//exports.getMyOrders =getMyOrders
//exports.getOrders =getOrders