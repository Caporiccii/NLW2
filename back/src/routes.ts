import express from 'express'
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';


const routes = express.Router();

const classesControler = new ClassesController();
const connectionController = new ConnectionController();
routes.post('/classes', classesControler.create);

routes.get('/classes', classesControler.index);

routes.post('/connections', connectionController.create);

routes.get('/connections', connectionController.index);


export default routes;