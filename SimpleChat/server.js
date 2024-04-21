import { Server } from "socket.io";
import { EVENT_INFO, EVENT_MESSAGE } from "./constants.js";


const io = new Server(3000);

console.log('Server is started ... ');

io.on('connection',(socket)=>{
    console.log('A Client has been connected');

    socket.emit(EVENT_INFO,'Welcome to SimpleChat');


    socket.on(EVENT_MESSAGE,({sender,message})=>{
        socket.emit(EVENT_MESSAGE,{sender,message});

    });
});

