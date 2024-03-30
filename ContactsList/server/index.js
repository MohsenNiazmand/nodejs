
import express from 'express';
import routes from './routes.js';
import bodyParser from 'body-parser';
const app = express();



function loggerMiddleware(req, res, next) {
    console.log('Requset:', req.method, req.url);
    next();
}


app.disable('etag');
app.use(bodyParser.urlencoded({extended:false}));
app.use(loggerMiddleware);
app.use('/contacts', routes);



app.listen(3000, () => {
    console.log('express server is Listening on the port 3000');
});



