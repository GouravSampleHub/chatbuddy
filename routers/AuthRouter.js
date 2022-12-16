const express = require('express')

const {User,errorHandler} = require('../models')
const ApiResponse = require('./response/ApiResponse')

const jwt = require('../config/JwtManager')

const router = express.Router()

router.post('/save',async (req,res)=>
{
    try {
        var reqData = req.body
        reqData.otp = 111
        // Email Send
        const user = await User.create(reqData)
        res.json(new ApiResponse(true,user,"User Saved !"))
    }catch(err){
        console.log(err.errors)
        var error = errorHandler(err)
        res.json(new ApiResponse(false,error,"User Saved Failed !"))
    }
})
router.post('/login',async (req,res)=>
{
    const {email,password} = req.body;
    const user = await User.findOne({
        where : {email,password}
    });
    if(user==null)
        res.json(new ApiResponse(false,null,"Invalid Id or Password !"))
    else 
    {
        const token = jwt.generateAccessToken(user.id)
        res.json(new ApiResponse(true,{name:user.name,token},"Login Success !"))
    }
})

module.exports = router