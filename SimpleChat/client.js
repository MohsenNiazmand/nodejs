import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { io } from "socket.io-client";
import { EVENT_INFO, EVENT_MESSAGE } from "./constants.js";

function clearPrevLine(){
    output.moveCursor(0,-1);
    output.clearLine();
}

function printDivider(fullName){
    console.log(`--------[${fullName}]---------`);
}

function setupSocket(fullName) {
    const socket = io("ws://localhost:3000");


    socket.on('connect', () => {
        clearPrevLine();
        console.log('Connected to the server.');
        printDivider(fullName);
    });


    socket.on(EVENT_INFO, (message) => {
        clearPrevLine();
        console.log('[Srver info]:', message);
        printDivider(fullName);
    });


    socket.on(EVENT_MESSAGE, ({ sender, message }) => {
        clearPrevLine();
        console.log(`${sender} : ${message}`);
        printDivider(fullName);
    });
    return socket;
}

async function getInput(rl,socket,sender) {

    const message = await rl.question('');

    clearPrevLine();


    socket.emit(EVENT_MESSAGE, { sender, message });

    getInput(rl, socket, sender);

}


async function main() {
    console.log('---Simple Chat Client----');

    const rl = readline.createInterface({ input, output });

    const fullName = await rl.question('fullName: ');


    const socket = setupSocket(fullName);



    getInput(rl, socket, fullName);

}


main();