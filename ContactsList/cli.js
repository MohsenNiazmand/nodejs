import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { sequelize,Contact } from './models/index.js';
import {
    formatContactsList,
} from './services.js';

const rl = readline.createInterface({ input, output });







async function createNewContact() {
    const firstName = await rl.question('First Name : ');
    const lastName = await rl.question('Last Name : ');
    const mobilePhone = await rl.question('Phone (mobile) : ');
    const isFavorite = await rl.question('Is Favorite (default=false) : ');

    await Contact.create({
        firstName,
        lastName,
        mobilePhone,
        isFavorite:['Yes','Yes','YES'].includes(isFavorite),
    });
}

async function deleteContact() {


   await showContactsList();

    const id = await rl.question('Enter the ID of the contact you want to delete: ');

    await Contact.destroy({
        where: { id },
    });
}




async function showContactsList() {
    const contacts=await Contact.findAll();

    const formattedContactList = formatContactsList(contacts);

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
        await createNewContact();
    } else if (action === 'l') {
       await showContactsList();

    } else if (action === 'd') {
      await  deleteContact();
    } else {
        quit();
        return;
    }
    console.log('---------------');

    help();
}
async function main() {


    console.log('--- Contacts List ---');

    try {
        await sequelize.sync({ force: false });
        console.log("[All models were synchronized successfully.]");
        help();

    } catch (error) {
        console.log('Error in syncing models : ', error);

    }


}


await main();

