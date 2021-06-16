import jwt from 'jsonwebtoken';

//const jwt = require('jsonwebtoken')

//this is a token generator for jwt
 const generateToken = (id) => {
   return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:'30d'})
//this simple jwt.sign with 3 arguments is how you generate jwt tokens
}





export default generateToken
//exports.generateToken = generateToken
