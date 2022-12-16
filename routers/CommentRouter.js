const express = require('express')
const {User,PostComment,errorHandler} = require('../models')
const ApiResponse = require('./response/ApiResponse')
const router = express.Router()

router.post("/save",async(req,res)=>
{
    var user = await User.findOne({where:{id:req.user}})
    if(user==null)
        res.json(new ApiResponse(false,null,"User Not Found !"))
    else
    {
        try {
            var cmtObj = {sender:user.id,cmtdate:new Date()}

            const {comment,post} = req.body
            cmtObj.comment = comment
            cmtObj.post = post

            var postComment = await PostComment.create(cmtObj)
            res.json(new ApiResponse(true,postComment,"Comment Saved !"))
        }catch(err){
            console.log(err)
             var error = errorHandler(err)
            res.json(new ApiResponse(false,error,"User Comment Failed !"))
        }
    }
})


module.exports = router