import express from 'express'
//const express = require('express')

import {authUser,presentClientMessage,presentAdminMessage, getUserProfile, registerUser,updateUserProfile,getUsers, deleteUser,getUserById, updateUser,verifyUser} from '../controllers/userControllers.js'
//const {authUser, getUserProfile, registerUser,updateUserProfile,getUsers, deleteUser,getUserById, updateUser} =require('../controllers/userControllers.js')

import {protect,admin} from '../Middleware/authMiddleware.js'
//const {protect,admin} = require('../Middleware/authMiddleware.js')

const router = express.Router()

//@Fetch all products
//@GET api/users/
//@Public access
//@this is good commenting syntax,leting others know the routes
router.route('/').post(registerUser).get(protect,admin,getUsers)
router.route('/login').post(authUser)
router.route('/clientMessage').patch(presentClientMessage)
router.route('/adminMessage').patch(protect,admin,presentAdminMessage)
router.route('/verify').post(verifyUser)
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)
//in the get route, protect is the middleware, thats how you implement middleware in this syntax, so smooth,no app.use)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)

//exports.router =router ;
export default router