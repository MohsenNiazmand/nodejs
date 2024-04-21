import readline from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import { io } from "socket.io-client";
import { EVENT_INFO, EVENT_MESSAGE } from "./constants.js";


const socket = io("ws://localhost:3000");


socket.on('connect', () => {
    console.log('Connected to the server.');
});


socket.on(EVENT_INFO, (message) => {
    console.log('[Srver info]:', message);
});


socket.on(EVENT_MESSAGE, ({sender,message}) => {
    console.log(`${sender} : ${message}`);
});

console.log('---Simple Chat Client----');

// Wrap the entire code in an async function to use await
(async () => {
    const rl = readline.createInterface({ input, output });
    const fullName = await rl.question('fullName: ');

    // Define getInput function
    async function getInput() {
        const message = await rl.question('message: ');
        socket.emit(EVENT_MESSAGE, { sender: fullName, message });
        getInput(); // Call getInput again to wait for next input
    }

    // Call getInput function initially
    getInput();
})();

// const rl=readline.createInterface({input,output});

// const fullName=await rl.question('fullName: ');

// async function getInput() {
//     const message =await rl.question('message: ');
    
//     socket.emit(EVENT_MESSAGE,{sender: fullName,message});
//    await getInput();
// }

// getInput();
