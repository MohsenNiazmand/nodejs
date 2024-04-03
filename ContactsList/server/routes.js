import express from "express";
import { formatContactsList, generateNewContactId, loadContacts, saveContacts } from '../services.js';

const contactList = [];

const router = express.Router();

router.get('/list', (req, res) => {
    if (req.query.format) {
        const responseData = `<pre>${formatContactsList(contactList)}</pre>`;
        res.type('html');
        res.send(responseData);
        return;
    }
    res.json(contactList);

});


router.post('/new', (req, res) => {
    const { firstName, lastName } = req.body;

    const id = generateNewContactId(contactList);

    const newContact = {
        id,
        firstName,
        lastName
    };

    contactList.push(newContact);
    saveContacts(contactList);


    res.send(`The contact #${id} ${firstName} ${lastName} has been created`)
});


router.delete('/:id', (req, res) => {
    if (contactList.length < 1) {
        res.status(400).send({
            message: 'There is no contact on the list',
        });

        return;
    }

    const contactIndex = contactList.findIndex(({ id }) => id === Number(req.params.id));

    if (contactIndex < 0) {
        res.status(400).send({
            message: 'Invalid ID',
        });

        return;
    }

    contactList.splice(contactIndex, 1);
    saveContacts(contactList);

    res.send(`Contact #${req.params.id} has been deleted!`);
});
const loadedContacts = await loadContacts();
contactList.push(
    ...loadedContacts,
);

export default router;