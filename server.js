const request = require('request'); 
const dotenv = require('dotenv');
const morgan =require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
const Stock = require('./models/Stock');
dotenv.config({path : './config/config.env'});
const http = require('http').Server(app)
const io = require('socket.io')(http,{
    cors: {
        origin: "https://btech-biryani.onrender.com",
        methods: ["GET", "POST"]
    }
});
connectDB();
app.use(cors());
app.use(express.json());

//socket io
io.on("connection", (socket) => {
   
   
    socket.on("stockchange",async (varia)=>{
     
        await Stock.findOneAndUpdate({name : varia[0].name}, {quantity : varia[0].count});
        await Stock.findOneAndUpdate({name : varia[1].name}, {quantity : varia[1].count});
        io.emit("new_stock");
    })
   
   

  }); 


  // routes
app.get('/',(req,res)=> res.status(200).json('hello user'));

app.post('/api/v1/orders' , (req, res)=>{
   
    const user = new User({name : req.body.name, hostel : req.body.hostel, phonenumber : req.body.phonenumber , slot : req.body.slot ,progress:false, transactionID : req.body.transactionID , items:req.body.items});
        let user1;
         user.save()
        .then(user => {user1 = user;
          
             res.status(200).send(user1);})
        .catch(err => console.log(err));
})

app.get('/api/v1/orders', async (req, res)=>{
    try{
    const orders =await User.find({ });
   
    res.status(200).json(orders);
    }
    catch{
         res.status(200).json("no orders to show")
    }
})

app.get(`/api/v1/stocks/:name`,async (req,res) => {
    try{
     
        const stock = await Stock.find({name : req.params.name})
     
        res.status(200).json(stock);
        }
        catch{
             res.status(200).json("no orders to show")
        }
  
})

app.post('/api/v1/stocks',async (req,res) => {
    const stock = new Stock({name : req.body.name, quantity :req.body.quantity});
    let user1;
     stock.save()
    .then(user => {user1 = user;
        console.log(`new stock added`);
         res.status(200).send(user1);})
    .catch(err => console.log(err));
  
})

app.put('/api/v1/orders/updateprogress/:id',async(req,res)=>{
    try{
    
        const order=await User.findByIdAndUpdate({_id:req.params.id},{progress:req.body.progress}).then((res)=>{console.log(res)})
        res.status(200).json("update success")
    }
    catch(er){
        console.log(er)
    }
})

app.get('/deleteorders',(req,res)=>{
    User.deleteMany({}).then(function(){
       // Success
        res.status(200).json("success");
     }).catch(function(error){
        // Failure
        res.status(501).json("failure");
     });
})
const PORT = process.env.PORT || 5000;

http.listen(PORT);

//app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));