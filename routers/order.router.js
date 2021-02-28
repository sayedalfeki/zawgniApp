const ordercontroller=require('../controllers/order.controller')
const express=require('express')
const router=express.Router()
router.post('/addorder',ordercontroller.addOrder)
router.put('/updatestatus:id',ordercontroller.updateStatus)
router.put('/updatequantity:id',ordercontroller.updateQuantity)
router.delete('/deleteorder:id',ordercontroller.deleteOrder)
router.get('/allbuyerorders:buyer',ordercontroller.getallbuyerorder)
module.exports=router