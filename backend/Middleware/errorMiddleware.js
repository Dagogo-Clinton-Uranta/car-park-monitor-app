const notFound = (req,res,next)=>{
 const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404)
  next(err)
}

const errorHandler = (err,req,res,next)=>{
  const statusCode = res.statusCode === 200?500:res.statusCode
  res.status(statusCode)
  res.json({
    message:err.message,
    stack:process.env.NODE_ENV='production'?null:err.stack
   /*I NEED TO UNDERSTAND THIS ERROR OBJECT AND WHEN TO USE IT*/
  })
}

export {notFound , errorHandler}
// exports.notFound =notFound 
// exports.errorHandler= errorHandler