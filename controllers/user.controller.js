const usermodel = require('../models/user.model')
exports.addUser=(req,res)=>{
    try{
    usermodel.find({$or:[{email:req.body.email},{username:req.body.username}]}).then(user=>{
        if(user.length>0){
        res.json({'register':false,'msg':'email or username already registered '})
        return }
    else{
   // res.json({'msg':'you can register with this email and user name'})
    const user=new usermodel(
    {
        name:
        {firstname
        :req.body.firstname,lastname:req.body.lastname,middlename:req.body.middlename},
        email:req.body.email,
        phones:[req.body.phone],
        password:req.body.password,
        username:req.body.username,
        profile_image:req.file!=null?req.file.path:req.body.profile_image,
        usertype:req.body.usertype
    }
    )
    user.save((err,user)=>{
        if(err==null)
        res.json({
            register:true,
            'msg':'user added succefully',
            'id':user._id
        })
        else
        res.json({
            'error':true,
            'msg':err
        })
    }) 
    }
    
    })
}
catch(e)
{
    res.json(e)
}
    /*
const user=new usermodel(
{
    name:
    {firstname
    :req.body.firstname,lastname:req.body.lastname,middlename:req.body.middlename},
    email:req.body.email,
    phones:[req.body.phone],
    password:req.body.password,
    username:req.body.username,
    profile_image:req.file.path
}
)
user.save((err,user)=>{
    if(err==null)
    res.json({
        'status':'succeded',
        'msg':'user added succefully',
        'user':user
    })
    else
    res.json({
        'status':'failed',
        'msg':err
    })
})*/
}
exports.updateUser=(req,res)=>
{
   usermodel.updateOne({_id:req.params.id},{$set:{name:{firstname:req.body.firstname,middlename:req.body.middlename
    ,lastname:req.body.lastname
    },phones:req.body.phone, profile_image:req.file!=null?req.file.path:req.body.profile_image,}}).then(upuser=>{
        if(upuser.nModified==1)
        res.json({'updated':true,'msg':'user name updated succefully'})
        else
        res.json({'updated':false,'mag':'something wrong'})
    }).catch(err=>{
        res.json({'error':err})
    })

}
exports.addphone=(req,res)=>{
    usermodel.updateOne({_id:req.params.id},{$addToSet:{phones:req.body.phone}},(err,upuser)=>{
        if(upuser.nModified==0)
        res.json({'update':false,'msg':err})
        else
        res.json({
            'update':true,
            'msg':upuser,
            
        })
    })
}
exports.deletephone=(req,res)=>{
usermodel.updateOne({_id:req.params.id},{$pull:{phones:req.body.phone}},(err,upuser)=>{
    if(upuser.nModified==0)
    res.json({'update':false,'msg':err})
    else
    res.json({
        'update':true,
        'msg':upuser,
        
    })
})
}
exports.addchat=(req,res)=>{
    usermodel.updateOne({_id:req.params.id},{$push:{chats:req.body.chat}},(err,upuser)=>{
        if(upuser.nModified==0)
        res.json({'update':false,'msg':err})
        else
        res.json({
            'update':true,
            'msg':upuser,
            
        })
    })
}
exports.addusername=(req,res)=>{
    usermodel.updateOne({name:'newuser'},{$set:{username:req.body.username}},{new:true},
    (err,upuser)=>{
        if(err)
        res.json({'update':false,'msg':'update failed due to '+err+''})
        else
        res.json({
            'update':true,
            'msg':'user updated succefully',

            'user':upuser
        })
    })
    }
exports.updatepassword=(req,res)=>{
usermodel.find({username:req.params.username}).then(user=>{
    if(user.length>0){
//res.json({'user':user})
usermodel.updateOne({username:req.params.username},{$set:{password:req.body.password}}).then(upuser=>{
    if(upuser.nModified==1)
    res.json({'msg':'paassword updated succefully'})
    else
    res.json({'mag':'something wrong'})
}).catch(err=>{
    res.json({'error':err})
})
    }
    else{
        res.json({'error':'no username match this username','user':user})
    }
})
}
exports.updateprofileimage=(req,res)=>{
     usermodel.updateOne({_id:req.params.id},{$set:{profile_image:req.file.path}}).then(upuser=>{
        if(upuser.nModified==1)
        res.json({'updated':true,'msg':'profile image updated succefully'})
        else
        res.json({'updated':true,'msg':'something wrong'})
    }).catch(err=>{
        res.json({'error':err})
    })
        }
    exports.updateusername=(req,res)=>{
        usermodel.find({username:req.params.username}).then(user=>{
            if(user.length>0){
        //res.json({'user':user})
        usermodel.find({username:req.body.username}).then(user=>{
            if(user.length<1){
           // res.json({'msg':'you can update'})
            usermodel.updateOne({username:req.params.username},{$set:{username:req.body.username}}).then(upuser=>{
                if(upuser.nModified==1)
                res.json({'msg':'user name updated succefully'})
                else
                res.json({'mag':'something wrong'})
            }).catch(err=>{
                res.json({'error':err})
            })
            }
            else
            res.json({'mag':'user name already exist'})
        }).catch(err=>{
            res.json({'error':err})
        })
            }
            else{
                res.json({'error':'no username match this username','user':user})
            }
        })
        }
        exports.updateemail=(req,res)=>{
            usermodel.find({username:req.params.username}).then(user=>{
                if(user.length>0){
            //res.json({'user':user})
            usermodel.find({email:req.body.email}).then(user=>{
                if(user.length<1){
               // res.json({'msg':'you can update'})
                usermodel.updateOne({username:req.params.username},{$set:{email:req.body.email}}).then(upuser=>{
                    if(upuser.nModified==1)
                    res.json({'msg':'email updated succefully'})
                    else
                    res.json({'mag':'something wrong'})
                }).catch(err=>{
                    res.json({'error':err})
                })
                }
                else
                res.json({'mag':'email already exist'})
            }).catch(err=>{
                res.json({'error':err})
            })
                }
                else{
                    res.json({'error':'no username match this username','user':user})
                }
            })
            }
            exports.updatename=(req,res)=>{
                 usermodel.updateOne({_id:req.params.id},{$set:{name:{firstname:req.body.firstname,
                    lastname:req.body.lastname,middlename:req.body.middlename}}}).then(upuser=>{
                    if(upuser.nModified>0)
                    res.json({'updated':true,'msg':'name updated succefully'})
                    else
                    res.json({'updated':false,'mag':'something wrong'})
                }).catch(err=>{
                    res.json({'error':err})
                })
                      }
exports.getAllUser=(req,res)=>{
usermodel.find({},(err,users)=>{
if(err==null)
res.json(users)
})
}
exports.isUser=(req,res)=>{
    usermodel.findOne({$and:[{username:req.query.name,password:req.query.pass}]},(err,user)=>{
        if(err)
        res.json({'error':err})
        else{
            if(user)
            res.json({
                'founded':true,
               // 'user':user
            })
            else
            res.json({'founded':false})
        }
    })
}
 exports.getUserId=(req,res)=>{
     usermodel.findOne({username:req.query.username}).then(user=>{res.json(user._id)}).catch(err=>{res.json(err)})
 }
 exports.getUserInfo=(req,res)=>{
    usermodel.findOne({_id:req.query.id}).then(user=>{res.json(user)}).catch(err=>{res.json(err)})
}
 exports.getUserName=(req,res)=>{
usermodel.find({username:req.query.username}).then(user=>{
    if(user.length>0)
    res.json({'founded':true})
    else 
    res.json({'founded':false})
}).catch(err=>{res.json(err)})
 }
 exports.getEmail=(req,res)=>{
    usermodel.find({email:req.query.email}).then(user=>{
        if(user.length>0)
        res.json({'founded':true})
        else 
        res.json({'founded':false})
}).catch(err=>{res.json(err)})
 }
exports.deleteUser=(req,res)=>{
    
}
