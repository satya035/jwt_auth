const jwt = require('jsonwebtoken')
const {UnauthenticatedError}= require('../errors/custom-error')


const authenticationMiddleware = async(req,res,next)=>{
    // console.log(req.headers.authorization)
    
    const authHeader = req.headers.authorization;

if(!authHeader || !authHeader.startWith('Bearer ')){
   throw new UnauthenticatedError('no token provided')

}

const token = authHeader.split(' ')[1]
try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username}= decoded
        req.user = (id,username)
        next()
    }catch(error){
        throw new UnauthenticatedError('not authorized to access this route')
    }

    next()
}
module.exports = authenticationMiddleware