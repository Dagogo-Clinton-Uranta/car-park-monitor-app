import express from 'express'
//const express = require('express')

//import bcrypt from  'bcryptjs'
//const bcrypt= require('bcryptjs')

import {addOrderItems, getOrderById, updateOrderToPaid,updateOrderToDelivered,updatePromisedQty, getMyOrders,getOrders} from '../controllers/orderController.js'
//const {addOrderItems, getOrderById, updateOrderToPaid,updateOrderToDelivered, getMyOrders,getOrders}= require('../controllers/orderController.js')

import {protect,admin } from '../Middleware/authMiddleware.js'
//const {protect,admin }= require('../Middleware/authMiddleware.js')

const router = express.Router()

//@Fetch all products
//@GET api/products/
//@Public access
//@this is good commenting syntax,leting others know the routes
router.route('/').post(protect,addOrderItems).get(protect,/*admin,*/getOrders).put(protect,updatePromisedQty)
router.route('/myorders').get(protect,getMyOrders)
//in the get route, protect is the middleware, thats how you implement middleware in this syntax, so smooth,no app.use)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin, updateOrderToDelivered)
router.route('/:id').get(protect,getOrderById)  //make sure this id route is the very last you do, cuz if you place anything below it, it will take whats after the slash as an id(chapter 10.1) ? research this
//exports.router = router;
export default router

//TEMPORARILY DISABLING ADMIN ROUTES FOR THE SHOW AND TELL