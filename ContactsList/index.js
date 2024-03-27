import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

const contactList = [];

console.log('--- Contacts List ---');



async function addNewContact() {
    const firstName = await rl.question('First Name : ');
    const lastName = await rl.question('Last Name : ');

    const newContact = {
        id: contactList.length,
        firstName,
        lastName
    };

    contactList.push(newContact);
}




function showContactsList() {
    const formattedContactList = contactList.map(({ id, firstName, lastName }) => '# ' + id + ' ' + firstName + ' ' + lastName).join('\n');

    console.log('Contacts List: ');
    console.log(formattedContactList);
}


function quit() {
    rl.close();
}


async function help() {
    console.log('n: Add new contact\nl: show contacts list\nq: quit');
    const action = await rl.question('Enter your action:');
    if (action == 'n') {
        await addNewContact();
    } else if (action === 'l') {
        showContactsList();
    } else {
        quit();
        return;
    }
    help();
}

await help();
// await addNewContact();
// showContactsList();
// quit();
