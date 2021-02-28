const commentmodel=require('../models/comment.model')
exports.addComment=(req,res)=>{
const comment=new commentmodel(
    {
        content:req.body.content,
        commentedon:req.body.commentedon,
        commentedby:req.body.commentedby,
        commenttime:Date.now()
    }
)
comment.save().then(com=>{res.json({'added':true,com})}).catch(err=>{res.json(err)})
}
exports.deleteComment=(req,res)=>{
commentmodel.deleteOne({_id:req.params.id}).then(com=>{
    if(com.deletedCount>0)
    res.json({'deleted':true})
    else
    res.json({'deleted':false})
}).catch(err=>{res.json(err)})
}
exports.getAllComments=(req,res)=>{
    commentmodel.find({commentedon:req.params.id}).then(com=>{res.json(com)}).catch(err=>{res.json(err)})
}