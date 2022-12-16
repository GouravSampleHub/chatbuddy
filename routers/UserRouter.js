const express = require('express')
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const {User,errorHandler} = require('../models')
const ApiResponse = require('./response/ApiResponse')
const {Op} = require('sequelize')
const router = express.Router()

const msgModel = require('../models/mongo/MessageSchema')

router.get("/list",async (req,res)=>
{
    const list = await User.findAll({
        where : { id : {[Op.ne] : req.user}},
        attributes: { exclude : ['id','password','createdAt','updatedAt'] }
    })
    res.json(new ApiResponse(true,list,"User List !"))
})

// Name , Phone
router.put("/update",async (req,res)=>
{
    try {
        const {name,phone} = req.body;
        //console.log(name,phone)
        var user = await User.findOne({where:{id:req.user}})
        if(user==null)
            res.json(new ApiResponse(false,null,"User Not Found !"))
        else
        {
            user = await user.update({name,phone})
            res.json(new ApiResponse(true,{name,phone},"User Updated !"))
        }    
    }catch(err){
        console.log(err.errors)
        var error = errorHandler(err)
        res.json(new ApiResponse(false,error,"User Update Failed !"))
    }
})

router.put("/changepassword",async (req,res)=>
{
    try {
        const {old_password,new_password} = req.body;
        
        var user = await User.findOne({where:{id:req.user}})
        if(user==null)
            res.json(new ApiResponse(false,null,"User Not Found !"))
        else
        {
            if(user.password==old_password)
            {
                user = await user.update({password:new_password})
                res.json(new ApiResponse(true,null,"User Password Changed !"))
            }else{
                res.json(new ApiResponse(false,null,"Password Not Match !"))
            }
        }    
    }catch(err){
        console.log(err.errors)
        var error = errorHandler(err)
        res.json(new ApiResponse(false,error,"User Change Password Failed !"))
    }
})

router.put("/uploadpic",async (req,res)=>
{   
   try {
    var user = await User.findOne({where:{id:req.user}})
    if(user==null)
        res.json(new ApiResponse(false,null,"User Not Found !"))
    else
    {
        const filename = req.files.image.name
        const newFileName = uuidv4() + path.extname(filename);
        const dirPath = path.join(__dirname,"../uploads/users")

        const mv = req.files.image.mv
        const uploadPath = path.join(dirPath,newFileName)
        mv(uploadPath)
        
        const dbPath = path.join("http://localhost:8081","users",newFileName)
        console.log(dbPath)
        user = await user.update({image:dbPath})
        res.json(new ApiResponse(true,null,"User Image Uploaded !"))
    } 
   }catch(err){
    console.log(err.errors)
    var error = errorHandler(err)
    res.json(new ApiResponse(false,error,"User Image Upload Failed !"))
   } 
})

router.get("/search",async (req,res)=>
{
    // name , phone, email
    // Not Exact 
    var {searchtxt} = req.body;
})

router.post("/msg/send",async (req,res)=>
{
    var {receiverId , msg} = req.body;
    var sender = await User.findOne({where:{id:req.user}})
    if(sender==null)
        res.json(new ApiResponse(false,null,"Sender Not Found !"))
    else
    {
        var receiver = await User.findOne({where:{id:receiverId}})
        if(receiver==null)
            res.json(new ApiResponse(false,null,"Receiver Not Found !"))
        else{
            var obj = new msgModel({sender:sender.id,
                                    receiver:receiver.id,
                                    msg : msg,
                                msgdate : new Date()});
            obj = await obj.save()
            res.json(new ApiResponse(true,obj,"Message Sent !"))
        }    
    }   
})

router.get("/msg/get/:id",async (req,res)=>
{
    var receiverId = req.params.id;
    var sender = await User.findOne({where:{id:req.user}})
    if(sender==null)
        res.json(new ApiResponse(false,null,"Sender Not Found !"))
    else
    {
        var receiver = await User.findOne({where:{id:receiverId}})
        if(receiver==null)
            res.json(new ApiResponse(false,null,"Receiver Not Found !"))
        else{
            const messages = await msgModel.find({receiver:receiver.id})
            res.json(new ApiResponse(true,messages,"Messages !"))
        }    
    }   
})

module.exports = router