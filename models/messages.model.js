const mongoose=require('mongoose')
const Schema=mongoose.Schema
const messageschema=new Schema(
    {
        sender:{type:String,required:true},
        sendingto:{type:String,required:true},
        content:{type:String,required:true},
        messagetime:{type:String},
       
          }
)
module.exports=mongoose.model('messages',messageschema,'messages')