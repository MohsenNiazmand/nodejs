import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import fs from 'fs/promises'

const CONTACTS_LIST_FILE_PATH = './data/contacts-list.json';

const rl = readline.createInterface({ input, output });

const contactList = [];

console.log('--- Contacts List ---');

async function loadContacts() {
    try {
        const contactsListJSON = await fs.readFile(CONTACTS_LIST_FILE_PATH, 'utf-8');
        contactList.push(
            ...JSON.parse(contactsListJSON),
        );
    } catch (error) {
        throw error;
    }
}

async function saveContacts() {
    try {
        const contactsListJSON = JSON.stringify(contactList);
        await fs.writeFile(CONTACTS_LIST_FILE_PATH, contactsListJSON);
    } catch (error) {
        throw error;
    }
}


async function addNewContact() {
    const firstName = await rl.question('First Name : ');
    const lastName = await rl.question('Last Name : ');

    const newContact = {
        id: contactList.length,
        firstName,
        lastName
    };

    contactList.push(newContact);
    saveContacts();
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
async function main() {
    await loadContacts();
    help();
}


await main();

