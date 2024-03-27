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

    const lastContact=contactList[contactList.length-1];
    const id=lastContact?  lastContact.id+1 : 0;

    const newContact = {
        id,
        firstName,
        lastName
    };

    contactList.push(newContact);
    saveContacts();
}

async function deleteContact() {

    if(contactList.length<1){
        console.error('There is No contact in list');
        return;
    }
    showContactsList();

  const contactId=await  rl.question('Enter the ID of the contact you want to delete: ');
    try {
        // let contactList = await loadContacts();
        const index = contactList.findIndex(contact => contact.id === Number(contactId));
        // If contact with the given ID is found, delete it
        if (index !== -1) {
            contactList.splice(index, 1);
            // Save updated contact list to file
            saveContacts();
            console.log(`Contact with ID ${contactId} deleted successfully.`);
        } else {
            console.error(`Contact with ID ${contactId} not found.`);
        }
        help();
    } catch (error) {
        throw error;
    }
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
    console.log('n: Add new contact\nl: show contacts list\nd: delete contact\nq: quit');
    console.log('---------------');
    const action = await rl.question('Enter your action:');
    if (action == 'n') {
        await addNewContact();
    } else if (action === 'l') {
        showContactsList();

    } else if (action === 'd') {
        deleteContact();
    } else {
        quit();
        return;
    }
    console.log('---------------');

    help();
}
async function main() {
    await loadContacts();
    help();
}


await main();

