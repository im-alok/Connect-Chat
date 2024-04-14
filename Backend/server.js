const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/database');
const userRoutes = require('./Route/userRoutes');
const chatRoutes = require('./Route/chatRoutes');
const messageRoute = require('./Route/messageRoute');
const searchRoute = require('./Route/searchRoutes');
const profileRoute = require('./Route/profileRoute');
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require('./config/cloudinary');

//adding middlewares to get the data
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

//establishing connection between server nad dataBases
dbConnect();
console.log('db connect process is over');

//connection to the cloudianry
cloudinaryConnect()

//listening the request
//api mounting
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/connect', chatRoutes);
app.use('/api/v1/message', messageRoute);
app.use('/api/v1/search',searchRoute);
app.use('/api/v1/profile',profileRoute);

//listening to the port
const server = app.listen(4000, () => {
    console.log('server is started at port number 4000');
})


//getting the test page

app.get('/', (req, res) => {
    res.send('Hello Hii welcome to the test page of ConnectChat');
})

//configuring the socket.io
// console.log(server)
const io = require('socket.io')(server, {
    pingTimeOut: 60000,
    cors: {
        origin: process.env.ORIGIN,
    }
})
// console.log(io);

io.on("connection", (socket) => {
    // console.log('connected to socket.io');

    //connect to its own personal socket
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit('connected');
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        // console.log('user joinded the room', room);

    })

    socket.on("typing", (room) => {socket.in(room.chatId).emit("Typing",room.user)});
    socket.on("stop typing", (room) => socket.in(room.chatId).emit("Stop typing",room.user));


    socket.on('new Message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if (!chat.users) return console.log('chat.users is not defined');

        // console.log(chat.users);
        chat.users.forEach((user) => {
            // console.log(user._id)
            if (user._id == newMessageReceived.deliverMessage.senderId._id) {
                // console.log('returning')
                return;
            }

            else {
                socket.in(newMessageReceived.chat._id).emit("message received", newMessageReceived)
            }
        })

    })

})