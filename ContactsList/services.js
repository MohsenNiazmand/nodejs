
import fs from 'fs/promises'


const CONTACTS_LIST_FILE_PATH = './data/contacts-list.json';


export async function loadContacts() {
    try {
        const contactsListJSON = await fs.readFile(CONTACTS_LIST_FILE_PATH, 'utf-8');
        return JSON.parse(contactsListJSON);
    } catch (error) {
        throw error;
    }
}

export async function saveContacts(contactList) {
    try {
        const contactsListJSON = JSON.stringify(contactList);
        await fs.writeFile(CONTACTS_LIST_FILE_PATH, contactsListJSON);
    } catch (error) {
        throw error;
    }
}


export function formatContactsList(contactsList) {
    return contactsList.map(({ id, first_name, last_name,is_favorite }) => `${is_favorite ? '*' : '#'}`+ id + ' ' + first_name + ' ' + last_name).join('\n');

}


export function generateNewContactId(contactList){
    const lastContact = contactList[contactList.length - 1];
    const id = lastContact ? lastContact.id + 1 : 0;
    return id;
}