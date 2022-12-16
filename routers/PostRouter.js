const express = require('express')
const {User,UserPost,errorHandler} = require('../models')
const ApiResponse = require('./response/ApiResponse')
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const router = express.Router()

router.post("/save",async(req,res)=>
{
    var user = await User.findOne({where:{id:req.user}})
    if(user==null)
        res.json(new ApiResponse(false,null,"User Not Found !"))
    else
    {
        try {
            var postObj = {user:user.id,postdate:new Date()}

        const {message} = req.body
        postObj.message = message

        
        if(req.files!=undefined)
        {
            const image = req.files.image 
            const filename = image.name
            const newFileName = uuidv4() + path.extname(filename);
            const dirPath = path.join(__dirname,"../uploads/posts")

            const mv = image.mv
            const uploadPath = path.join(dirPath,newFileName)
            mv(uploadPath)
        
            const dbPath = path.join("http://localhost:8081","posts",newFileName)
            postObj.postfile = dbPath;    
        }

        var userPost = await UserPost.create(postObj)
        res.json(new ApiResponse(true,userPost,"Post Saved !"))
        }catch(err){
            console.log(err)
             var error = errorHandler(err)
            res.json(new ApiResponse(false,error,"User Post Failed !"))
        }
    }
})

router.get("/list",async (req,res)=>
{
    const list = await UserPost.findAll({
        include : ['postBy','comments'],
        attributes: { exclude : ['user','createdAt','updatedAt'] }
    })
    res.json(new ApiResponse(true,list,"User Post List !"))
})

router.get("/userpost/:id",async (req,res)=>
{
    const id = req.params.id
    const list = await UserPost.findAll({
        where : {user:id},
        include : ['postBy','comments'],
        attributes: { exclude : ['user','createdAt','updatedAt'] }
    })
    res.json(new ApiResponse(true,list,"User Post List !"))
})

router.get("/mypost",async (req,res)=>
{
    const id = req.user;
    const list = await UserPost.findAll({
        where : {user:id},   
        include : ['comments'],    
        attributes: { exclude : ['user','createdAt','updatedAt'] }
    })
    res.json(new ApiResponse(true,list,"User Post List !"))
})


module.exports = router