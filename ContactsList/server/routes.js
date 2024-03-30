import  express  from "express";
import { formatContactsList,generateNewContactId,loadContacts, saveContacts } from '../services.js';

const contactList = [];

const router = express.Router();

router.get('/list',(req,res)=>{
    if(req.query.format){
        const responseData=`<pre>${formatContactsList(contactList)}</pre>`;
        res.type('html');
        res.send(responseData);
        return;
    }
        res.json(contactList);
    
});


router.post('/new',(req,res)=>{
    const {firstName,lastName} = req.body;

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



const loadedContacts = await loadContacts();
contactList.push(
    ...loadedContacts,
);

export default router;