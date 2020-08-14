import express from 'express';
import ClasseController from './controller/ClasseController';
import ConnectionController from './controller/ConnectionController';
const routes = express.Router();
const classController = new ClasseController();
const connectionController = new ConnectionController();


routes.post('/classes', classController.store);
routes.get('/classes', classController.index);

routes.post('/conection',connectionController.store);
routes.get('/conection', connectionController.index);

export default routes;