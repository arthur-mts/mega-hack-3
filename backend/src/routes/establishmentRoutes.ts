import { Router } from 'express';
import upload from '../config/upload';
import errorHandler from '../errors/ErrorHandlerFunction';
import EstablishmentController from '../controllers/EstablishmentController';
import auth from '../middlewares/auth';
import establishmentReservationRouter from './establishmentReservationRoutes';

const establishmentRouter = Router();

establishmentRouter.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, password, description, phoneNumber, latitude, longitude } = req.body;

    const { filename } = req.file;

    const establishment = await EstablishmentController.store({
      name,
      email,
      password,
      avatar: filename,
      latitude,
      longitude,
      phoneNumber,
      description,
    });

    return res.json(establishment);
  } catch (err) {
    errorHandler(err, res);
  }
});

establishmentRouter.get('/', async (req, res) => {
  try {
    const { latitude, longitude, radius = 10000 } = req.query;

    const establishments = await EstablishmentController.list({
      latitude: String(latitude),
      longitude: String(longitude),
      radius: Number(radius),
    });

    return res.json(establishments);
  } catch (err) {
    errorHandler(err, res);
  }
});

establishmentRouter.use(auth);

establishmentRouter.put('/', upload.single('avatar'), async (req, res) => {
  try {
    const { name, description, phoneNumber, latitude, longitude } = req.body;

    const { establishment_id } = req;

    let filename;

    if (req.file) filename = req.file.filename;

    const establishment = await EstablishmentController.update({
      establishment_id,
      name,
      avatar: filename,
      phoneNumber,
      latitude,
      longitude,
      description,
    });

    return res.json(establishment);
  } catch (err) {
    errorHandler(err, res);
  }
});

establishmentRouter.use('/reservations', establishmentReservationRouter);

export default establishmentRouter;
