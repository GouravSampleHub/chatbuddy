const express = require('express')

const userRouter = require('./UserRouter')
const postRouter = require('./PostRouter')
const commentRouter = require('./CommentRouter')



const router = express.Router()

router.use("/user",userRouter)
router.use("/post",postRouter)
router.use("/comment",commentRouter)



module.exports = router