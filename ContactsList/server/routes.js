import  express  from "express";
import { formatContactsList,loadContacts } from '../services.js';

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

const loadedContacts = await loadContacts();
contactList.push(
    ...loadedContacts,
);

export default router;