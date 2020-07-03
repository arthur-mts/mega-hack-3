import { Router } from 'express';
import UserController from '../controllers/UserController';
import upload from '../config/upload';
import errorHandler from '../errors/ErrorHandlerFunction';
import auth from '../middlewares/auth';
import userReservationRouter from './userReservationRoutes';

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

userRouter.put('/', upload.single('avatar'), async (req, res) => {
  const { name } = req.body;

  const { user_id } = req;

  let filename = null;

  if (req.file) filename = req.file.filename;

  const user = await UserController.update({ user_id, name, avatar: filename });

  return res.json(user);
});

userRouter.use('/reservations', userReservationRouter);

// userRouter.use('/establishments');

export default userRouter;
