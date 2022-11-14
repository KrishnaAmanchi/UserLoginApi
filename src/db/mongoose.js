const mongoose=require('mongoose')

const validator=require('validator')

const connectionUrl="mongodb+srv://userLogin:userLogin123@cluster0.hceboxr.mongodb.net/user-login?retryWrites=true&w=majority"

mongoose.connect(connectionUrl,{
    useNewUrlParser:true
})