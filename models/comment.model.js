const mongoose=require('mongoose')
const Schema=mongoose.Schema
const comment=new Schema(
   {commentedon:{type:String},
   commentedby:{type:String},
   content:{type:String},
   commenttime:{type:String}
}
)
module.exports=mongoose.model('comment',comment,'comment')