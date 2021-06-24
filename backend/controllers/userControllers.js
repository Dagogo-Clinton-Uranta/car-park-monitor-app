import User from '../models/userModel.js'

import FreshExit from '../models/freshExitModel.js'

import Product from '../models/productModel.js' /*you're not supposed to do this usually */
import asyncHandler from 'express-async-handler'
//const asyncHandler = require('express-async-handler')

import generateToken from '../utils/generateToken.js'
//const generateToken = require('../utils/generateToken.js')

/*import xoauth2 from 'xoauth2'*/

import {google} from 'googleapis';

import nodemailer from 'nodemailer'
//const nodemailer = require('nodemailer')

import dotenv from 'dotenv'

import mongoose from 'mongoose'

//I'm using this bit of code to  convert my strings to object Id


dotenv.config()

//@desc  Populate the ticket when a user wants one
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  /*const { email } = req.body*/
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own

  const user = await User.find({ })
  if (user) {
    res.json({
      _id: user[0]._id,
      bookingNumber: user[0].bookingNumber,
      truckNumber: user[0].truckNumber,
      containerNumber: user[0].containerNumber,
      truckCategory: user[0].truckCategory,
      /*isAdmin: user.isAdmin,
      isMerchant: user.isMerchant,
      token: generateToken(user._id)*/


    })
  } else {
    res.send(404) //this means not found
    throw new Error('Unable to populate ENTRY ticket')
  }


})


const exitPopulateTicket = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  /*const { email } = req.body*/
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own

  const newExit = await FreshExit.find({ })
  if (newExit) {
    res.json({
      _id: newExit[0]._id,
      bookingNumber: newExit[0].bookingNumber,
      truckNumber: newExit[0].truckNumber,
      containerNumber: newExit[0].containerNumber,
      truckCategory: newExit[0].truckCategory,
      /*isAdmin: user.isAdmin,
      isMerchant: user.isMerchant,
      token: generateToken(user._id)*/


    })
  } else {
    res.send(404) //this means not found
    throw new Error('Unable to populate EXIT ticket')
  }


})


//@desc  Recieve truck details
//@route POST /api/users/parkenter
//@access Public
const entryTicketRequest = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const { email } = req.body
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own
   User.deleteMany()
  const user = await User.save(email)
  const product = Product.find({})

  let spaceAvailability 
  if(user && user.truckCategory === 'EXPORT' && product && product[5].number === 52 && product[6].number === 50 && product[7].number === 51 && product[8].number === 95 ){spaceAvailability = 'No spaces available for this category of truck(EXPORT)'}
  else if(user && user.truckCategory === "FLAT BED ENL/EKO" && product && product[0].number === 37 && product[1].number === 46 ){spaceAvailability = 'No spaces available for this category of truck(FLAT BED ENL/EKO)'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product && product[2].number === 78 && product[3].number === 30 && product[4].number === 71){spaceAvailability = 'No spaces available for this category of truck(FLATBED APMT)'}
  else{spaceAvailability = 'Spaces Available'}

  if (user) {
    res.json({
      URL: `https://www.flacscarpark.herokuapp.com/printenter`,
      Availability:spaceAvailability
      /*_id: user._id,
      truckNumber: user.truckNumber,
      containerNumber: user.containerNumber,
      truckCategory: user.truckCategory,*/
     


    })
  } else {
    res.send(404) //this means not found
    throw new Error('booking number not recognized')
  }


})


//@desc Set the message that the user wants to convey to the admin
//@route PATCH /api/users/clientMessage
//@access Public
const presentClientMessage = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const { clientId, clientMessage, clientName } =  await req.body
  console.log(req.body)
  const objectId = new mongoose.Types.ObjectId(clientId)
  // i need to reset a particular users message so i have to delete by the id i just recieved, HENCE I NEED ID
  await User.findByIdAndUpdate({_id:objectId}, { userMessage: clientMessage , adminMessageNotification:true , userMessageNotification:false}, { useFindAndModify: false })
  /*clientMessage has been changed to string before being passed into the database cuz of app.use(express.json)*/


  //what we will use to generate a dynamic access token
  const oAuth75Client = new google.auth.OAuth2( process.env.GOOGLE_CLIENT_ID,  process.env.GOOGLE_CLIENT_SECRET, process.env.REDIRECT_URI)
  
  oAuth75Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  const accessToken = oAuth75Client.getAccessToken().catch(console.error)
     console.log(oAuth75Client)
  try{
    

    //setup of email for nodemailer
    let transporter =   nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      service: 'gmail',
      secure: true,
      debug: false,
      logger: true,
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    })
    //what i actually want to send to the user/client 
    let mailOptions = {
      from: process.env.EMAIL,
      to: 'smartsoft_mikeo@yahoo.com',
      subject: `Message from client: ${clientName}, --ID: ${clientId}`, 
      text: `${clientMessage}` 
    }

    //actually sending the mail
      transporter.sendMail(mailOptions , function (err, data) {
      if (err) {
        console.log('Error Occured:', err);
      } else {
        console.log('Email sent!');
      }

    })
  }
   catch(error){
    console.log(error)
  }
  res.status(201)
})


//@desc Set the message that the user wants to convey to the admin
//@route PATCH /api/users/adminMessage
//@access Private Admin
const presentAdminMessage = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const { bossMessage, clientId, clientEmail, clientName } = req.body
  console.log(req.body)
  const objectId = new mongoose.Types.ObjectId(clientId)
  // i need to reset a particular users message so i have to delete by the id i just recieved, HENCE I NEED ID
  await User.findByIdAndUpdate({_id:objectId}, { adminMessage:bossMessage, adminMessageNotification:false , userMessageNotification:true}, { useFindAndModify: false })
 


  //what we will use to generate a dynamic access token
  //I did this above earlier, am i covered by function scope-yes
  /*oAuth75Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
  const accessToken = await oAuth75Client.getAccessToken().token

  //setup of email for nodemailer
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    secure: true,
    debug: false,
    logger: true,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken

    }
  })
  //what i actually want to send to the user/client 
  let mailOptions = {
    from: process.env.EMAIL,
    to: clientEmail ,
    cc: 'dagogouranta@gmail.com',
    subject: `Message from bridgeway customer service to ${clientName}`, 
    text: ` Dear ${clientName}, ${bossMessage}` 
  }

  //actually sending the mail
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error Occurs:', err);
    } else {
      console.log('Email sent!');
    }

  })*/

  res.status(201)
})

 //@desc  Verify a user before payment
//@route POST /api/users/verify
//@access Public


const verifyUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const {clientId ,personalIdQuery, personalIdAnswer } = req.body
  const objectId = new mongoose.Types.ObjectId(clientId)
  const user = await User.findById(objectId)  
   
  /*console.log(user)*/
    
  switch(personalIdQuery){
  case 'momFirstName': 
  if(user && user.momFirstName === personalIdAnswer){
    return res.send({confirmedState:'true'})
  }
   else{
    return res.send({confirmedState:'false'})
   }

  case 'shoeSize':
  if(user && user.shoeSize === personalIdAnswer){
    return res.send({confirmedState:'true'})
  }
   else{
    return res.send({confirmedState:'false'})
   }

  case 'closestFriend':
   if(user && user.closestFriend === personalIdAnswer){
    return res.send({confirmedState:'true'})
    
   }
    else{
      return res.send({confirmedState:'false'})
    
   }
    
  case 'childhoodStreet':
  if(user && user.childhoodStreet === personalIdAnswer){
    return res.send({confirmedState:'true'})
    
  }
   else{
    return res.send({confirmedState:'false'})
    
   }
  case  'firstEmployment':
  if(user && user.firstEmployment === personalIdAnswer){
    return res.send({confirmedState:'true'})
    
  }
   else{
    return res.send({confirmedState:'false'})
    
   }
      
  default: return res.send({confirmedState:'false'})
  
}
  
})



//@desc Register a new user
// route GET api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const { zoneArea,zoneCounter,change } = req.body
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  /* res.send({email,  this res,send was just done for example btw
     password}) */ //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own

    /*let tagCounters = await Product.find({})
  console.log(tagCounters)

   let position = tagCounters.map((e)=>{return e.area}).indexOf(zoneArea)

   tagCounters[position][2] = zoneCounter 

   await Product.deleteMany()
  await Product.insertMany(tagCounters)*/

  await Product.findOneAndUpdate({tagCounter:zoneArea}, {number:zoneCounter + change}, { useFindAndModify: false })/*:(
  zoneArea='B'?await Product.findOneAndUpdate({tagCounterB:zoneCounter}, {tagCounterB:zoneCounter + 1}, { useFindAndModify: false }):(
  zoneArea='C'?await Product.findOneAndUpdate({tagCounterC:zoneCounter}, {tagCounterC:zoneCounter + 1}, { useFindAndModify: false }):(
  zoneArea='D'?await Product.findOneAndUpdate({tagCounterD:zoneCounter}, {tagCounterD:zoneCounter + 1}, { useFindAndModify: false }):(
  zoneArea='E'?await Product.findOneAndUpdate({tagCounterE:zoneCounter}, {tagCounterE:zoneCounter + 1}, { useFindAndModify: false }):(
  zoneArea='F'?await Product.findOneAndUpdate({tagCounterF:zoneCounter}, {tagCounterF:zoneCounter + 1}, { useFindAndModify: false }):(
  zoneArea='G'?await Product.findOneAndUpdate({tagCounterG:zoneCounter}, {tagCounterG:zoneCounter + 1}, { useFindAndModify: false }):(
  zoneArea='H'?await Product.findOneAndUpdate({tagCounterH:zoneCounter}, {tagCounterH:zoneCounter + 1}, { useFindAndModify: false }):(
  zoneArea='R'?await Product.findOneAndUpdate({tagCounterR:zoneCounter}, {tagCounterR:zoneCounter + 1}, { useFindAndModify: false }):(
  console.log('There is no zoneArea coming from the front end')
                                                                                                            )))))))))*/
})
//@desc  GET user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  /* res.send({email,  this res,send was just done for example btw
     password}) */ //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own
     console.log(req.user._id)
     const objectId = new mongoose.Types.ObjectId(req.user._id)
  const user = await User.findById(objectId)
  
  /*I am using function scope to  name all my return objects user, and it works, cuz of scope*/
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userMessage: user.userMessage,
      adminMessage: user.adminMessage,
      isAdmin: user.isAdmin,
      isMerchant: user.isMerchant
    })
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc  update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  
       //res.send accepts an object i think and not just variables, take note...hese are part of the things that you have to research on yor own
     const objectId = new mongoose.Types.ObjectId(req.user._id)
  
     const user = await User.findById(objectId)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userMessage: updatedUser.userMessage,
      adminMessage: updatedUser.adminMessage,
      isAdmin: updatedUser.isAdmin,
      isMerchant: updatedUser.isMerchant,
      token: generateToken(updatedUser._id)
    })
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
})



//@desc  GET all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const users = await User.find({})
  
  res.json(users)
})

//@desc  delete a user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const objectId = new mongoose.Types.ObjectId(req.params._id)
  const user = await User.findById(objectId)
  
  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404) //404 is not found
    throw new Error('User not found')
  }

})

//@desc  GET user by id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  /*console.log(req.params)*/
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const user = await User.findById(objectId).select('-password') //gotta research select
  if (user) {
    res.json(user)
  } else {
    res.status(404) //404 is not found
    throw new Error('User not found')
  }

})


//@desc  update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  
  const user = await User.findById(objectId)
  /*the way he names every variable user, he is aware of function scope and he uses it well*/
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userMessage: updatedUser.userMessage,
      adminMessage: updatedUser.adminMessage,
      isAdmin: updatedUser.isAdmin,
      isMerchant: updatedUser.isMerchant

    })
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
})


export {
  authUser, presentClientMessage, presentAdminMessage, getUserProfile, registerUser,
  updateUserProfile, getUsers, deleteUser, getUserById, updateUser,verifyUser,entryTicketRequest,exitPopulateTicket
}

//exports.authUser =authUser
//exports.getUserProfile =getUserProfile
//exports.registerUser = registerUser
//exports.updateUserProfile = updateUserProfile
//exports.getUsers = getUsers
//exports.deleteUser = deleteUser
//exports.getUserById = getUserById
//exports.updateUser = updateUser
