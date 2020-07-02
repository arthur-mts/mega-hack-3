import { Router } from 'express';
import upload from '../config/upload';
import errorHandler from '../errors/ErrorHandlerFunction';
import EstablishmentController from '../controllers/EstablishmentController';

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

export default establishmentRouter;
