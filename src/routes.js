import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import FinalizeOrderController from './app/controllers/FinalizeOrderController';
import StartOrderController from './app/controllers/StartOrderController';
import ScheduleDeliveryController from './app/controllers/ScheduleDeliveryController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';


import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);// trava o fluxo, permitindo o seguinte ser usado apenas quando
// autorizado o Middleware
routes.put('/users', UserController.update);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/deliverymans', DeliveryManController.store);
routes.get('/deliverymans', DeliveryManController.index);
routes.put('/deliverymans/:id', DeliveryManController.update);
routes.delete('/deliverymans/:id', DeliveryManController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.get('/orders', OrderController.index);
routes.delete('/orders/:id', OrderController.delete);
routes.put('/orders/:id/finalize', FinalizeOrderController.update);
routes.put('/orders/:id/start/:deliverymanId', StartOrderController.update);


routes.get('/deliveryman/:id/deliveries', ScheduleDeliveryController.index);
routes.get('/deliveryman/:id/delivered', ScheduleDeliveryController.index_2);

routes.get('/deliveryproblems', DeliveryProblemsController.index);
routes.get('/delivery/:id/problems', DeliveryProblemsController.index_2);
routes.post('/delivery/:deliverId/problems', DeliveryProblemsController.store);
routes.delete('/problem/:problemId/cancel-delivery', DeliveryProblemsController.delete);


export default routes;


// utilizar um meddlewares para que os destinatários só possam ser
// criados a partir de um usuário cadastrado(admin)
