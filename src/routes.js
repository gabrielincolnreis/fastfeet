import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);// trava o fluxo, permitindo o seguinte ser usado apenas quando
// autorizado o Middleware
routes.put('/users', UserController.update);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);


export default routes;


// utilizar um meddlewares para que os destinatários só possam ser
// criados a partir de um usuário cadastrado(admin)
