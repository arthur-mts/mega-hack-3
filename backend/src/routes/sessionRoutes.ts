import { Router } from 'express';
import errorHandler from '../errors/ErrorHandlerFunction';
import UserSessionController from '../controllers/UserSessionController';
import EstablishmentSessionController from '../controllers/EstablishmentSessionController';

const sessionRouter = Router();

sessionRouter.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await UserSessionController.store({ email, password });

    return res.json({ user, token });
  } catch (err) {
    errorHandler(err, res);
  }
});

sessionRouter.post('/establishments', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { establishment, token } = await EstablishmentSessionController.store({ email, password });

    return res.json({ establishment, token });
  } catch (err) {
    errorHandler(err, res);
  }
});

export default sessionRouter;
