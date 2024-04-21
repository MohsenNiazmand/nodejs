import { Server } from "socket.io";
import { CHANNEL_PUBLIC, EVENT_INFO, EVENT_MESSAGE } from "./constants.js";


const io = new Server(3000);

console.log('Server is started ... ');

io.on('connection',(socket)=>{
    console.log('A Client has been connected');

    socket.emit(EVENT_INFO,'Welcome to SimpleChat');

    socket.join(CHANNEL_PUBLIC);


    socket.on(EVENT_MESSAGE,({sender,message})=>{
        // socket.emit(EVENT_MESSAGE,{sender,message});
        console.log(`[${sender}]: ${message}`);
            io.to(CHANNEL_PUBLIC).emit(EVENT_MESSAGE,{sender,message});
    });
});

