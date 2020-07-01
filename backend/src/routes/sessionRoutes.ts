import { Router } from 'express';
import errorHandler from '../errors/ErrorHandlerFunction';
import SessionController from '../controllers/SessionController';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await SessionController.store({ email, password });

    return res.json({ user, token });
  } catch (err) {
    errorHandler(err, res);
  }
});

export default sessionRouter;
