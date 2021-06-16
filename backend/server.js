import path from 'path'
//const path = require('path')

import express from 'express'
//const express = require('express')

//import products from './data/products.js'
import dotenv from 'dotenv'
//const dotenv = require('dotenv')

import colors from 'colors'
//const colors = require('colors')

//import mongoose from 'mongoose'
//const mongoose = require('mongoose')

import morgan from 'morgan'
//const morgan = require('morgan')

import {notFound,errorHandler} from './Middleware/errorMiddleware.js'
//const {notFound,errorHandler} = require('./Middleware/errorMiddleware.js')

import connectDB from './config/db.js'
//const connectDB = require('./config/db.js')

import productRoutes from './routes/productRoutes.js'
//const productRoutes =require('./routes/productRoutes.js')

import userRoutes from './routes/userRoutes.js'
//const userRoutes = require('./routes/userRoutes.js')

import orderRoutes from './routes/orderRoutes.js'
//const orderRoutes =require('./routes/orderRoutes.js')

import uploadRoutes from './routes/uploadRoutes.js'
//const uploadRoutes =require('./routes/uploadRoutes.js')

import {presentAdminMessage} from './controllers/userControllers.js'
//const {authUser, getUserProfile, registerUser,updateUserProfile,getUsers, deleteUser,getUserById, updateUser} =require('../controllers/userControllers.js')

import {protect,admin} from './Middleware/authMiddleware.js'
//const {protect,admin} = require('../Middleware/authMiddleware.js')

/*import cors from 'cors'*/

dotenv.config()
 
connectDB()

 const app = express()
if(process.env.NODE_ENV === 'development'){app.use(morgan('dev'))} //I prefer to use morgan in development and not in production

 app.use(express.json())  //this is the new bodyParser that is in express and allows us to read json from req.body



/*app.use(cors())*/
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
}) //this is a CONFIG route to access the paypal client id

//this is a temporary route, until i can figure out what is going on with my admin messages
app.patch('/admin/user/:id/api/users/adminMessage',presentAdminMessage)
//this is a temporary route, until i can figure out what is going on with my admin messages


const __dirname =path.resolve() //OKAY BRAD DID THIS TO MIMIC PATH.JOIN(__DIRNAME) , BECAUSE THE OG __dirname IS ONLY ACCESSIBLE IN COMMON JS AND NOT ES6 SYNTAX
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))



if(process.NODE_ENV === 'production'){

  app.use(express.static(path.join(__dirname,'/frontend/build')))

  app.get('*', (req,res) =>{ 
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}else{
  /*app.get('/', (req,res) => {
    res.send('API is running...')
  })*/

  app.use(express.static(path.join(__dirname,'/frontend/build')))

  app.get('*', (req,res) =>{ 
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })



}

app.use(notFound)

app.use(errorHandler)

const port=process.env.PORT||5000

app.listen(port, ()=>{
  console.log(`Server is listening in ${process.env.NODE_ENV} mode,
     on port ${port}`.yellow.bold)
})
