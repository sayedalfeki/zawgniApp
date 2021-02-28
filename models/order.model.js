const mongoose=require('mongoose')
const Schema=mongoose.Schema
const order=new Schema(
    {
        product:{type:String},
        buyer:{type:String},
        quantity:{type:Number},
        orderstatus:{type:String}
    }
)
module.exports=mongoose.model('order',order,'order')