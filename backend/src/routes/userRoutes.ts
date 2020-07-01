import { Router } from 'express';
import UserController from '../controllers/UserController';
import upload from '../config/upload';
import AppError from '../errors/AppError';
import errorHandler from '../errors/ErrorHandlerFunction';

const userRouter = Router();

userRouter.post('/', upload.single('thumbnail'), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { filename } = req.file;

    const user = await UserController.store({ name, email, password, thumbnail: filename });

    return res.json(user);
  } catch (err) {
    errorHandler(err, res);
  }
});

export default userRouter;
