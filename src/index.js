const express=require('express')

require("./db/mongoose")

const app=express()

const userRouter=require('./routers/users')

const port=process.env.PORT || 3000

const multer=require('multer')

app.use(express.json())

app.use(userRouter)

app.listen(port,()=>{
    console.log("server is running at port number ",port)
})


