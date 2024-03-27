import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

const contactList = [];

console.log('--- Contacts List ---');

const firstName=await rl.question('First Name : ');
const lastName=await rl.question('Last Name : ');

const newContact={
    id:contactList.length,
    firstName,
    lastName
};

contactList.push(newContact);

const formattedContactList=contactList.map(({id,firstName,lastName})=> '# '+id+' '+firstName+' '+lastName).join('\n');

console.log('Contacts List: ');
console.log(formattedContactList);

rl.close();