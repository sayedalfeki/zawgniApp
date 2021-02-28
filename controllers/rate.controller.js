const ratemodel=require('../models/rate.model')
exports.addRate=(req,res)=>{
const rate=new ratemodel(
    {
        percent:parseInt(req.body.percent),
        ratedon:req.body.ratedon,
        ratedby:req.body.ratedby,
       
    }
)
rate.save().then(rate=>{res.json({'added':true,rate})}).catch(err=>{res.json(err)})
}
exports.deleteRate=(req,res)=>{
ratemodel.deleteOne({_id:req.params.id}).then(rate=>{
    if(rate.deletedCount>0)
    res.json({'deleted':true})
    else
    res.json({'deleted':false})
}).catch(err=>{res.json(err)})
}
exports.getProductRate=(req,res)=>{
ratemodel.find({ratedon:req.params.id}).then(rate=>{res.json(rate)}).catch(err=>{res.json(err)})
}
exports.getUserRateOnProduct=(req,res)=>{
    ratemodel.find({$and:[{ratedon:req.query.product},{ratedby:req.query.user}]}).then(rate=>{res.json(rate)}).catch(err=>{res.json(err)})
    }
