const mongoose = require('mongoose');
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const apiRouter = require('./routers')
const authRouter = require('./routers/AuthRouter')
const jwt = require('./config/JwtManager')
dotenv.config()

const server = express()
server.use(fileUpload())
server.use(express.urlencoded())
server.use(express.json())

server.use(express.static(path.join(__dirname,"uploads")))

server.use("/api",async (req,res,next)=>
{
    const result = await jwt.authenticateToken(req)
    if(result.status)
        next()
    else
        res.json(result)    
})
server.use("/api",apiRouter)

server.use("/auth",authRouter)

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>
{
    mongoose.connect('mongodb://localhost:27017/chatbuddy');
    console.log(`http://localhost:${PORT}`)
})
