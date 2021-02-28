const mongoose=require('mongoose')
const Schema=mongoose.Schema
const rate=new Schema(
   {
    ratedon:{type:String},
   ratedby:{type:String},
   percent:{type:Number},
   }
)
module.exports=mongoose.model('rate',rate,'rate')