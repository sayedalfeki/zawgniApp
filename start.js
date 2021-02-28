
const express=require('express')
const mongose=require('mongoose')
const bodyparser=require('body-parser')
const userrouter=require('./routers/user.router')
const prodrouter=require('./routers/product.router')
const commentrouter=require('./routers/comment.router')
const orderrouter=require('./routers/order.router')
const raterouter=require('./routers/rate.router')
const messagerouter=require('./routers/message.router')
const multer=require('multer')
const app=express()
const server=require('http').createServer(app);
const io=require('socket.io')(server)
io.on('connection', function(client){
   		console.log('new user connected')	
          /* client.on('typing',(data)=>{
console.log(data)
io.emit('typing',data)
           })  
           client.on('message',(data)=>{
            console.log(data)
            io.emit('message',data)
           })  	
           client.on('location',(data)=>{
            console.log(data)
            io.emit('location',data)
 })  */			 
})
                                                                                                                                                                                                
let port=3333
const storage=multer.diskStorage({
     destination:(req,file,cb)=>{
  cb(null,'upload')
   },
filename:(req,file,cb)=>{
cb(null,file.originalname)
    }
})
const filter=(req,file,cb)=>{
    if(file.mimetype=='image.jpg'||file.mimetype=='image.jpeg'||file.mimetype=='image.png')
    cb(null,true)
    else 
    cb(null,false)
}
const upload=multer({storage:storage,filefilter:filter})
mongose.set('useCreateIndex', true);
mongose.connect('mongodb://localhost:27017/data',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
if(err!=null)console.log('error in connection')
else console.log('connected to database')
},)
app.use(bodyparser.json({extended:true}))
app.use(bodyparser.urlencoded({extended:true}))
app.use(upload.single('image'))
app.use(express.static('upload'))
app.use('/user',userrouter)
app.use('/product',prodrouter)
app.use('/comment',commentrouter)
app.use('/order',orderrouter)
app.use('/rate',raterouter)
app.use('/message',messagerouter)
server.listen(port,()=>{
    console.log('server connected!!!')
})