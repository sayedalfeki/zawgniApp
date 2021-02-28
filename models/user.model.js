const mongoose=require('mongoose')
const Schema=mongoose.Schema
const user=new Schema(
    {
        name:{type:Object,required:true},
        email:{type:String,required:true,unique:true},
        phones:{type:Array},
        password:{type:String,required:true},
        username:{type:String,unique:true,unique:true},
        profile_image:{type:String},
        usertype:{type:String},
        chats:{type:Array}
        
    }
)
module.exports=mongoose.model('user',user,'user')
  