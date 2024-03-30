
import url from 'url';
import express from 'express';
import { formatContactsList, loadContacts } from './services.js';


const app=express();

const contactList = [];


function loggerMiddleware(req,res,next){
    console.log('Requset:', req.method, req.url);
    next();
}


app.disable('etag');
app.use(loggerMiddleware);

app.get('/list',(req,res)=>{
    if(req.query.format){
        const responseData=`<pre>${formatContactsList(contactList)}</pre>`;
        res.type('html');
        res.send(responseData);
        return;
    }
        res.json(contactList);
    
});


// const server = http.createServer((req, res) => {
//     const urlData = url.parse(req.url, true);

//     console.log(req.method, req.url);

//     let responseData=null;

//     if(urlData.query.format==true){
//         res.setHeader('Content-Type', 'text/html')
//         responseData=formatContactsList(contactList);
//     }else{
//       responseData=  JSON.stringify(contactList);
//         res.setHeader('Content-Type', 'application/json')
//     }


   
//     res.writeHead(200);

//     res.write(responseData);

//     res.end();
// });





async function main() {
    const loadedContacts = await loadContacts();
    contactList.push(
        ...loadedContacts,
    );
    app.listen(3000,()=>{
        console.log('express server is Listening on the port 3000');
    });
}


await main();