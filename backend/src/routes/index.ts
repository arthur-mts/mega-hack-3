import express from 'express';
import userRouter from './userRoutes';
import sessionRouter from './sessionRoutes';
import auth from '../middlewares/auth';
import establishmentRouter from './establishmentRoutes';

const router = express.Router();

router.use((req, _res, next) => {
  console.log(`[${req.method.toUpperCase()}]: ${req.url}`);
  next();
});

router.use('/users', userRouter);

router.use('/sessions', sessionRouter);

router.use('/establishment', establishmentRouter);

export default router;
