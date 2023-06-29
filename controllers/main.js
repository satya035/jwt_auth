//check username, password in post{login} request
//if exist create new JWT
//send back to fron-end
//setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const {BadRequestError}= require('../errors')

const login = async(req,res)=>{
    const {username,password}=req.body

    
//mongo
//joi
//check in the controller
if(!username||!password){
     throw new BadRequestError('please provide the username and password')
}

//just for demo, normally provided by DB
const id = new Date().getDate()


//try to keep payload small,better experience for user
const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn: '30d'})

    res.status(200).json({msg:'user created',token})
    // console.log(username,password);
    // res.send("fake login/register/signup route")
}

// this is where v share the authorized data

const dashboard = async(req,res)=>{
   
console.log(req.user);

     const luckyNumber = Math.floor(Math.random()*100)

    res.status(200).json({
            msg:`helloo, ${req.user.username}`,
            secret:`here is your authorized data,your number  is ${luckynumber}`
        })

}

module.exports = {
    login,dashboard
}