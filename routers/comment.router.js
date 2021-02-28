const commentcontroller=require('../controllers/comment.controller')
const express=require('express')
const router=express.Router()
router.post('/addcomment',commentcontroller.addComment)
router.delete('/deletecomment:id',commentcontroller.deleteComment)
router.get('/allcomments:id',commentcontroller.getAllComments)
module.exports=router