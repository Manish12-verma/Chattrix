import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

//create express app and http server
const app = express();
const server = http.createServer(app);

//create socket.io instance
export const io = new Server(server,{
    cors:{origin: "*"}
})

//store online users
export const userSocketMap = {};  // key: userId, value: socketId

//socket.io connection handler
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`User connected: ${userId}`);
    if(userId) {
        userSocketMap[userId] = socket.id; // store the socket id for the user
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap)); // emit online users to all clients

    socket.on('disconnect',()=>{
        console.log(`User disconnected: ${userId}`);
        delete userSocketMap[userId]; // remove the user from the online users map
        io.emit('getOnlineUsers', Object.keys(userSocketMap)); // emit updated online users to all clients
    })
})


//middleware
app.use(express.json({limit: '4mb'}));
app.use(cors());


//Route setup
app.use("/api/status", (req, res) => (res.send("Server is running")))
app.use('/api/auth',userRouter)
app.use('/api/messages',messageRouter);


// connect to the database
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});


