const ratecontroller=require('../controllers/rate.controller')
const express=require('express')
const router=express.Router()
router.post('/addrate',ratecontroller.addRate)
router.delete('/deleterate:id',ratecontroller.deleteRate)
router.get('/getrate:id',ratecontroller.getProductRate)
router.get('/getuserrate',ratecontroller.getUserRateOnProduct)
module.exports=router