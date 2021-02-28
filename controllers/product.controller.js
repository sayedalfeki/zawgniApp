
const productmodel=require('../models/product.model')
const fs=require('fs')
//const usermodel=require('../models/user.model')
exports.addfile=(req,res)=>{
   // console.log(req.body.names)
 console.log(req.file)
}
exports.deletefile=(req,res)=>{
    fs.unlink(req.query.path,(r)=>{
        if(r==null)
res.json({'deleted':true})
else
res.json({'deleted':false,r})

 })
 }
exports.addProduct=(req,res)=>{
  const product=new productmodel(
    {
        productname:req.body.productname,
        price:parseInt(req.body.price),
        quantity:parseInt(req.body.quantity),
        details:req.body.details,
        category:req.body.category,
        subcategory:req.body.subcategory,
        seller:req.body.seller,
        productphotos:[req.file.path]
    }
)
product.save((err,prod)=>{
    if(err)
    res.json({
        'added':false,
        'err':err})
    else
    res.json({
        'added':true,
        'msg':'product added',
        'id':prod._id
    })
})
}
exports.addProuctPhoto=(req,res)=>{
    productmodel.findByIdAndUpdate({_id:req.params.id},{$addToSet:{productphotos:req.file.path}}).then(prod=>{res.json({
        'added':true,
        prod})}).catch(err=>{res.json({'added':false,err})})
}
exports.deleteProuctPhoto=(req,res)=>{
    productmodel.findByIdAndUpdate({_id:req.params.id},{$pull:{productphotos:req.body.path}}).then(prod=>{
        
          res.json({'deleted':true,prod})}).catch(err=>{res.json({'deleted':false,err})})
}
exports.updateProduct=(req,res)=>{
     productmodel.updateOne({_id:req.params.id},{$set:{category:req.body.category, productname:req.body.productname,
    price:parseInt(req.body.price),
    quantity:parseInt(req.body.quantity),
    details:req.body.details,
    subcategory:req.body.subcategory,
    //seller:req.body.seller
}}).then(prod=>{
    if(prod.nModified>0)
    res.json({'updated':true})
    else
    res.json({'updated':false})

}).catch(err=>{res.json(err)})
}


exports.addLike=(req,res)=>
{
    productmodel.updateOne({_id:req.params.id},{$addToSet:{likes:req.body.likedby}}
        ).then(upprod=>{
            if(upprod.nModified>0)
            res.json({'liked':true})
            else
            res.json({'liked':false})
            }).catch(error=>res.json(error))
          
}
exports.deleteLike=(req,res)=>
{
    productmodel.updateOne({_id:req.params.id},{$pull:{
        likes:req.body.unlikedby}}).then(upprod=>{
            if(upprod.nModified>0)
            res.json({'removed':true})
            else
            res.json({'removed':false,upprod})
        }).catch(err=>{res.json(err)})
}

exports.adddisLike=(req,res)=>
{
    productmodel.updateOne({_id:req.params.id},{$push:{dislikes:req.body.dislikedby}}
        ).then(upprod=>{
            if(upprod.nModified>0)
            res.json({'disliked':true})
            else
            res.json({'disliked':false})
            }).catch(error=>res.json(error))
          
}
exports.deletedisLike=(req,res)=>
{
    productmodel.updateOne({_id:req.params.id},{$pull:{
        dislikes:req.body.undislikedby}}).then(upprod=>{
            if(upprod.nModified>0)
            res.json({'removed':true})
            else
            res.json({'removed':false,upprod})
        }).catch(err=>{res.json(err)})
}
exports.deleteProduct=(req,res)=>{
productmodel.deleteOne({_id:req.params.id}).then(del=>{
    if(del.deletedCount>0)
    res.json({'deleted':true,del})
    else
    res.json({'deleted':false,del})
}).catch(err=>{res.json(err)})
}
exports.getAllProduct=(req,res)=>{
   // console.log(req.body.filename)
   // console.log(req.file)
    productmodel.find({},{__v:0}).then(prod=>{res.json(prod)}).catch(err=>{res.json(err)})
}
exports.getSellerProduct=(req,res)=>{
    // console.log(req.body.filename)
    // console.log(req.file)
     productmodel.find({seller:req.query.seller},{__v:0}).then(prod=>{res.json(prod)}).catch(err=>{res.json(err)})
 }
exports.searchProduct=(req,res)=>{
   // console.log(req.body)
    productmodel.find().or([{productname:{$regex:req.query.searched}},
        {seller:{$regex:req.query.searched}},{details:{$regex:req.query.searched}},
        {category:{$regex:req.query.searched}},{subcategory:{$regex:req.query.searched}}]).then(prods=>{res.json(prods)})
        .catch(err=>{res.json(err)})
}
exports.searchProductBySeller=(req,res)=>{
    // console.log(req.body)
     productmodel.find({seller:req.params.seller}).or([{productname:{$regex:req.query.searched}},
         {seller:{$regex:req.query.searched}},{details:{$regex:req.query.searched}},
         {category:{$regex:req.query.searched}},{subcategory:{$regex:req.query.searched}}]).then(prods=>{res.json(prods)})
         .catch(err=>{res.json(err)})
 }
exports.getProduct=(req,res)=>{
    // console.log(req.body)
     productmodel.findOne({_id:req.query.id}).then(prod=>{res.json(prod)})
         .catch(err=>{res.json(err)})
 }
/*exports.searchCategory=(req,res)=>{
    // console.log(req.body)
     productmodel.find({'categorydetails.categoryname':req.query.searched}).then(prods=>{res.json(prods)})
         .catch(err=>{res.json(err)})
 }
 exports.getAllCategories=(req,res)=>{
productmodel.find({},{categorydetails:1}).then(prod=>{res.json(prod)}).catch(err=>res.json(err))
 }
 exports.searchPrice=(req,res)=>{
     productmodel.find({price:req.query.price}).then(prod=>{res.json(prod)}).catch(err=>{res.json(err)})
     
 }*/


















  /*  productmodel.find({$or:[{name:req.body.name},{
        catname:req.body.catname},{
       subcategory:req.body.subcategory},
       {addedby:req.body.addedby}
    ]},(err,prod)=>{
        
if(err)
res.json({'error':err})
else{
    if(prod)
res.json(prod)
else 
res.json({'prod':'no product match'})
}

exports.buyProduct=(req,res)=>{
    productmodel.updateOne({_id:req.params.id},{$set:{sellingbuyingdetails:{selledby:req.body.selledby,buyedby:req.body.buyedby,buyingtime:Date.now(),
        orderstatus:req.body.orderstatus}}}).then(upprod=>
            {
                if(upprod.nModified>0)
                res.json({'buying':true})
                else
                res.json({'buying':false})
        }).catch(err=>{res.json(err)})
}
exports.cancelBuying=(req,res)=>{
    productmodel.updateOne({_id:req.params.id},{$set:{sellingbuyingdetails:{buyedby:''}}}).then(upprod=>
            {
                if(upprod.nModified>0)
                res.json({'canceling':true})
                else
                res.json({'canceling':false})
        }).catch(err=>{res.json(err)})
}
exports.addComments=(req,res)=>
{
    productmodel.updateOne({_id:req.params.id},{$push:{
        comments:[{commentedby:req.body.commentedby,
        commentcontent:req.body.content,commenttime:Date.now()}]}}).then(upprod=>{
            if(upprod.nModified>0)
            res.json({'commented':true})
            else
            res.json({'commented':false})
        }).catch(err=>{res.json(err)})
}
exports.deleteComment=(req,res)=>
{
    productmodel.updateOne({_id:req.params.id},{$pull:{
        comments:{commentcontent:req.body.content}}}).then(upprod=>{
            if(upprod.nModified>0)
            res.json({'commented':true})
            else
            res.json({'commented':false,upprod})
        }).catch(err=>{res.json(err)})
}
exports.addRate=(req,res)=>
{
    productmodel.updateOne({_id:req.params.id},{$push:{rate:[{ratedby:req.body.ratedby,ratepercentage:parseInt(req.body.percentage)
        }]}}).then(upprod=>{
            if(upprod.nModified>0)
            res.json({'rated':true})
            else
            res.json({'rated':false})
        }).catch(err=>{res.json(err)})
}
exports.deleteRate=(req,res)=>
{
    productmodel.updateOne({_id:req.params.id},{$pull:{
        rates:{ratedby:req.body.content}}}).then(upprod=>{
            if(upprod.nModified>0)
            res.json({'removed':true})
            else
            res.json({'removed':false,upprod})
        }).catch(err=>{res.json(err)})
}
    })*/

