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
    res.status(404) //this means not found
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
      parkZone: newExit[0].parkZone
      /*isAdmin: user.isAdmin,
      isMerchant: user.isMerchant,
      token: generateToken(user._id)*/


    })
  } else {
    res.send(404) //this means not found
    throw new Error('Unable to populate EXIT ticket')
  }


})


//@desc  Recieve truck details,CHECK IT AGAINST THE TRUCK LOG FOR UNIQUENESS AND THE TRUCKS IN THE PARK FOR SPACE/ if it satisfies both conditions, then add it to the 'current' truck store(so that it can populate the print screen, but not the car park log)/then send the url AND AN OK STATUS MESSAGE, otherwise send "this truck is already in the park, check the booking number, or there is no space in the park"
//@route POST /api/users/parkenter
//@access Public
const entryTicketRequest = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  
  /*const { email } = req.body*/
  //req.body will give us the object thats sent in the body of our front end/POSTMAN JSON, take note
  let frontendMessage
  
  let object = {
    URL: `could not generate ticket`,
    statusMessage:frontendMessage
  }

  await User.deleteMany()
  const product = await Product.find({})
  console.log(product)

  let reg = []
  let confirmUniqueBooking = []
  
  for(let i = 0 ; i < product.length; i++){
      let isBookingNumberInParkingRegion = product[i].parkedTrucks.some(el => el.bookingNumber === req.body.bookingNumber)

      confirmUniqueBooking.push(isBookingNumberInParkingRegion)
  }
  
  for(let i = 0 ; i < product.length; i++){
    let trucksInParkingRegion = product[i].parkedTrucks.filter(el => el.bookingNumber !== "empty")

    reg.push(trucksInParkingRegion)
}
 

  if( confirmUniqueBooking.indexOf(true) !== -1 ){frontendMessage = 'A truck with this booking number is currently in this park, please check the booking number again'}
  else if(req.body.truckCategory === 'EXPORT'  && reg[5].length === 52 && reg[6].length === 50 && reg[7].length === 51 && reg[8].length === 95 ){frontendMessage = 'No spaces available for this category of truck(EXPORT)'}
  else if( req.body.truckCategory === "FLAT BED ENL/EKO"  && reg[0].length === 37 && reg[1].length === 46 ){frontendMessage = 'No spaces available for this category of truck(FLAT BED ENL/EKO)'}
  else if(req.body.truckCategory === "FLAT BED APMT" && reg[2].length === 78 && reg[3].length === 30 && reg[4].length === 71){frontendMessage = 'No spaces available for this category of truck(FLAT BED APMT)'}
  else if(req.body.truckCategory !== "FLAT BED APMT" ||req.body.truckCategory !== "EXPORT" ||req.body.truckCategory !== "FLAT BED ENL/EKO"  ){frontendMessage ='Could not process the requested truck category'}
  else{frontendMessage = 'Spaces are available to park this truck, please proceed to the printing screen via the URL'}

  
  
  if(frontendMessage = 'Spaces are available to park this truck, please proceed to the printing screen via the URL'){
  await User.create({bookingNumber:req.body.bookingNumber,
    truckNumber: req.body.truckNumber,
    containerNumber: req.body.containerNumber,
    truckCategory: req.body.truckCategory })

    object = {
      URL: `https://flacscarpark.herokuapp.com/printenter`,
      statusMessage:frontendMessage
    }

   }else{
    object = {
      URL: `could not generate ticket`,
      statusMessage:frontendMessage
    }

   }
  
res.json(object)
  


})


//@desc  Search the parkedTrucks arrays for the booking number that just came in, populate the FreshExit collection, then SEND a link to where to find the exit ticket./ if no match send a status message saying no such truck found
//@route POST /api/users/parkexit
//@access Public
const exitTicketRequest = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  
    /*i believe that i need to find said user from the park arrays -- I HAVE DONE THAT*/
   
    

    const product = await Product.find({/*'parkedTrucks.bookingNumber':req.body.bookingNumber*/},/*{parkedTrucks:{$elemMatch:{bookingNumber:req.body.bookingNumber}},createdAt:1,time:1}*/) 
    

    let confirmUniqueBooking = []
  
    for(let i = 0 ; i < product.length; i++){
        let isBookingNumberInParkingRegion = product[i].parkedTrucks.some(el => el.bookingNumber === req.body.bookingNumber)
  
        confirmUniqueBooking.push(isBookingNumberInParkingRegion)
    }
   
     if(confirmUniqueBooking.indexOf(true) !== -1 ){
      let truckExists = [] 
      
      for(let i = 0 ; i < product.length; i++){
        let searchArray = product[i].parkedTrucks.filter(el => el.bookingNumber === req.body.bookingNumber)
  
       if(searchArray[0] !== undefined ){truckExists.push(searchArray[0])}      /*i can get away with putting zero here, cuz booking number is unique, so it will only return one item per array */
    }
    

  /*const foundIndex = truckExists.findIndex(function(e){e.bookingNumber === req.body.bookingNumber}) */
    /*const truckDetails = truckExists.filter(function(e){typeof(e) !== 'undefined'})*/ 
     console.log(truckExists)
      
       await FreshExit.deleteMany()
      const newExit = await FreshExit.create({
        bookingNumber:truckExists[0].bookingNumber,
        trucKNumber:truckExists[0].truckNumber,
        containerNumber:truckExists[0].containerNumber,
        truckCategory:truckExists[0].truckCategory,
        parkZone:truckExists[0].parkZone

       })
        
          
          
           
           res.json( {URL: `https://flacscarpark.herokuapp.com/printexit`,
           statusMessage:'Your truck is ready to exit, please go to the URL to print out a ticket',
          zone: truckExists[0].parkZone})  

     }else{
      res.status(404)
     throw new Error('The truck you requested is currently not in Lilypond park, please cross-check the booking number')

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
  

  await Product.findOneAndUpdate({tagCounter:zoneArea}, {occupiedSpaces:zoneCounter + change}, { useFindAndModify: false })
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
  updateUserProfile, getUsers, deleteUser, getUserById, updateUser,verifyUser,entryTicketRequest,exitTicketRequest,exitPopulateTicket
}

//exports.authUser =authUser
//exports.getUserProfile =getUserProfile
//exports.registerUser = registerUser
//exports.updateUserProfile = updateUserProfile
//exports.getUsers = getUsers
//exports.deleteUser = deleteUser
//exports.getUserById = getUserById
//exports.updateUser = updateUser
