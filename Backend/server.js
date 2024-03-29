const express = require('express');
const app= express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/database');
const userRoutes = require('./Route/userRoutes');
const chatRoutes = require('./Route/chatRoutes');

//adding middlewares to get the data
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))

//establishing connection between server nad dataBases
dbConnect();
console.log('db connect process is over');

//listening the request
//api mounting
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/connect',chatRoutes);

//listening to the port
app.listen(4000,()=>{
    console.log('server is started at port number 4000');
})


//getting the test page

app.get('/',(req,res)=>{
    res.send('Hello Hii welcome to the test page of ConnectChat');
})