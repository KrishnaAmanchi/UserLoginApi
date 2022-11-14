const express=require('express')

const router=new express.Router()

const User=require("../models/user")

const auth=require('../middlewares/auth')


router.post('/users',async(req,res)=>{
    const me=new User(req.body)
    try{
        
        const token=await me.generateAuthToken()

        await me.save()
        
        res.send({me,token})
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        
        const token=await user.generateAuthToken()
        
        res.send({user,token})

    }catch(e){
        res.status(400).send(e)
    }
    
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
            // ikkada first token ante tokens array lo unna each index lo unna document andulo token ane key untundi
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/me',auth,async(req,res)=>{

    res.send(req.user)
   
})


module.exports=router