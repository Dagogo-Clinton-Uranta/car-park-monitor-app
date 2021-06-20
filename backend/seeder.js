import mongoose from 'mongoose'
//const mongoose = require('mongoose')

import dotenv from 'dotenv'
//const dotenv = require('dotenv')
 
import colors from 'colors'

import orders from './data/orders.js'

import users from './data/users.js'
//const users =require('./data/users.js')

import products from './data/products.js'
//const products =require('./data/products.js')

import User from './models/userModel.js'
//onst User =require('./models/userModel.js')

import Product from './models/productModel.js'
//const Product =require('./models/productModel.js')

import Order from './models/orderModel.js'
//const Order =require('./models/orderModel.js')

import connectDB from './config/db.js'
//const connectDB =require('./config/db.js')

 dotenv.config()

connectDB()

/*YOU'RE DEALING WITH A DATABASE, SO EVERYTHING RETURNS A PROMISE*/
/*YOURE DEALING WITH A DATABASE, SO EVERYTHING RETURNS A PROMISE*/

const importData = async()=> {

  try{
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()

    /*const createdUsers= */ await User.insertMany(users)
    /*const adminUser = createdUsers[0]._id*/

    /*const sampleProducts = products.map((product)=>{
       return {...product, user:adminUser}
    })*/
       await Product.insertMany(products)
       await Order.insertMany(orders)
       
       console.log('Data Imported'.green.inverse)
       process.exit() /*what is this process.exit?*/
  }

  catch(error){
    console.error(`Error:${error}`.red.inverse)
    process.exit(1)
  }

}


const destroyData = async()=> {

  try{
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()


       console.log('Data Desroyed!'.red.inverse)
       process.exit() /*what is this process.exit?*/
  }

  catch(err){
    console.error(`Error:${err}`.red.inverse)
    process.exit(1)
  }

}
if (process.argv[2]==2){
   destroyData()
}
else{importData()}

/*to call this seeder file we go node backend/seeder(-d).
 d flag to call delete. First of all, wtf is seeder and why
 are they using it */
