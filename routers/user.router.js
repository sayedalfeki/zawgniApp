const usercontroller=require('../controllers/user.controller')
const express = require('express')
const router=express.Router()
router.post('/adduser',usercontroller.addUser)
router.put('/addphone:id',usercontroller.addphone)
router.put('/deletephone:id',usercontroller.deletephone)
router.put('/updateusername:username',usercontroller.updateusername)
router.put('/updateuser:id',usercontroller.updateUser)
router.put('/updateemail:username',usercontroller.updateemail)
router.put('/updatepassword:username',usercontroller.updatepassword)
router.put('/updatename:id',usercontroller.updatename)
router.put('/updateprofileimage:id',usercontroller.updateprofileimage)
router.put('/chat:id',usercontroller.addchat)
router.get('/allusers',usercontroller.getAllUser)
router.get('/isuser',usercontroller.isUser)
router.get('/getuser',usercontroller.getUserInfo)
router.get('/getuserid',usercontroller.getUserId)
router.get('/isusername',usercontroller.getUserName)
router.get('/isemail',usercontroller.getEmail)
module.exports=router


