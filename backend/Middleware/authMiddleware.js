import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
//const jwt = require('jsonwebtoken')
//const User = require('../models/userModel.js')
//const asyncHandler = require('express-async-handler')

//this is a middleware function, so request rrsponse next, and if its an error handling one (err,req,res,next)

const protect = asyncHandler(async(req,res,next) => {
/*the token that jwt gives us will be sent in the header as a bearer token, for authorization,in postman, you'd tick  authorizaion under headers, and then in 'value' you'd type in "Bearer" then the token you got from jwt.sign */
/* req.headers.authorization will literally give you the word bearer(that you put in) , and then the token*/
  let token
  if(req.headers.authorization &&req.headers.authorization.startsWith('Bearer') ){
    try{
       token = req.headers.authorization.split(' ')[1]
      const decoded =jwt.verify(token,process.env.JWT_SECRET )

      req.user = await User.findById(decoded.id).select('-password') /*select '-password' is choosing to remove password from the things we return from Users.findById*/
   /*we will now have access to request.user in all of our protected routes*/
   /*how do we use mongoose commands when we havent imported mongoose to this file ?, does it come with the model or sth - YES IT DOES*/
    next()
    }
     catch(error){
    console.error(error)
    res.status(401)
    throw new Error('Not authorized, token failed')
     }
  //if you remove the token( untick it from postman , you may need the express async handler as the if(!token) below doesnt seem to catch the error)
  }
if(!token){
  res.status(401)
  throw new Error('Not authorized, no token')

  }

})

const admin = (req,res,next) => {
  if(req.user && req.user.isAdmin){
    next()
  }else{
    res.status(401) //401 is not authorized
    throw new Error('Not authorized as an admin')
  }
}

export {protect,admin}
//exports.protect = protect
//exports.admin = admin