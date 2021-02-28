const mongoose=require('mongoose')
const Schema=mongoose.Schema
const productschema=new Schema(
    {
        productname:{type:String,required:true},
        price:{type:Number,required:true},
        quantity:{type:Number,required:true},
        details:{type:String},
        category:{type:String,required:true},
        subcategory:{type:String},
        seller:{type:String,required:true},
        productphotos:{type:Array} ,
        likes:{type:Array},
        dislikes:{type:Array}
          }
)
module.exports=mongoose.model('product',productschema,'product')