import express from 'express';
import bodyParser from 'body-parser';
import loggerMiddleware from './middlewares/logger.js';
import contactRoutes from './routes/contacts.js';
import imagesRoutes from './routes/images.js';
import { sequelize } from '../models/index.js';
import configs from '../configs/server.js';

try {
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully');
} catch(error) {
    console.log('Error in syncing models:', error);
    throw error;
}

const app = express();

app.disable('etag');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use('/contacts', contactRoutes);
app.use('/images', imagesRoutes);

app.listen(configs.port, () => {
    console.log('express server is listening on the port 3000');
});
