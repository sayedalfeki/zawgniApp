const messagemodel = require('../models/messages.model')
exports.sendMessage=(req,res)=>
{
    const message=new messagemodel({
        sender:req.body.sender,
        sendingto:req.body.sendingto,
        content:req.body.content,
        messagetime:Date.now()
    })
    message.save().then(message=>{
        res.json({'sending':true,message})
    }).catch(err=>{res.json({'sending':false,err})})
}
exports.getAllUserMessages=(req,res)=>{
    messagemodel.find({$or:[{sender:req.query.user},{sendingto:req.query.user}]},).then(messages=>{res.json(messages)}).catch(err=>{res.json(err)})

}
exports.getAllBetMessages=(req,res)=>{
    messagemodel.find({$and:[{$or:[{sender:req.query.user1},{sendingto:req.query.user1}]},{$or:[{sender:req.query.user2},{sendingto:req.query.user2}]}]}).then(messages=>{res.json(messages)}).catch(err=>{res.json(err)})

}
exports.getAllSendrMessages=(req,res)=>{
    messagemodel.find({sender:req.query.sender},).then(messages=>{res.json(messages)}).catch(err=>{res.json(err)})

}
exports.getAllSendingMessages=(req,res)=>{
    messagemodel.find({sendingto:req.query.sendingto},).then(messages=>{res.json(messages)}).catch(err=>{res.json(err)})

}