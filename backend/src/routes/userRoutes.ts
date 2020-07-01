import { Router } from 'express';
import UserController from '../controllers/UserController';
import upload from '../config/upload';
import errorHandler from '../errors/ErrorHandlerFunction';
import auth from '../middlewares/auth';
import reservationRouter from './reservationRoutes';

const userRouter = Router();

userRouter.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { filename } = req.file;

    const user = await UserController.store({ name, email, password, avatar: filename });

    return res.json(user);
  } catch (err) {
    errorHandler(err, res);
  }
});

userRouter.use(auth);

userRouter.use('/reservations', reservationRouter);

export default userRouter;
