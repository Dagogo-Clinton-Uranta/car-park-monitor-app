import path from 'path'
//const path =require('path')

import express from 'express'
//const express = require('express')

import multer from 'multer'
//const multer =require('multer')

const router = express.Router()

const storage = multer.diskStorage({
  destination(req,file,cb){
     cb(null,'uploads/')
  },
  filename(req,file,cb){
     cb(null,`${file.fieldName}-${Date.now()}${path.extname(file.originalname)}`)
  },
})
function checkFileType(){
  const fileType =/png|jpeg|jpg/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())  //path.extname the extname is a method of path function, while in const extname, thats just a variable we're declaring
  const mimetype = filetypes.test(file.mimetype) //he explains it briefly, but what is a mimetype ?

if(extname && mimetype){
   return cb(null,true)
}else{
  cb('Images only!')
}

}

const upload = multer({
  storage,
  fileFilter(req,file,cb){
    checkFileType(file,cb)
  }
})

router.post('/',upload.single('image'),(req,res)=>{
  res.send(`/${req.file.path}`)
}) //upload.single is the middleware, damn

//exports.router =router
export default router
//MEHN YOU HAVE TO RESEARCH THIS MULTER, IT IS SOME OF THE WEIRDEST JAVASCRIPT I HAVE EVER TYPED
