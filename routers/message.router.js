const messagecontroller=require('../controllers/message.controller')
const express=require('express')
const router=express.Router()
router.post('/sendmessage',messagecontroller.sendMessage)
router.get('/getallusermessages',messagecontroller.getAllUserMessages)
router.get('/getallbetweenmessages',messagecontroller.getAllBetMessages)
module.exports=router