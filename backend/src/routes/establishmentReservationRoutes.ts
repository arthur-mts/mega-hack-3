import { Router } from 'express';
import errorHandler from '../errors/ErrorHandlerFunction';
import EstablishmentReservationController from '../controllers/EstablishmentReservationController';

const establishmentReservationRouter = Router();

establishmentReservationRouter.get('/:filter?', async (req, res) => {
  try {
    const { establishment_id } = req;

    const { filter } = req.params;

    const reservations = await EstablishmentReservationController.list({ establishment_id, filter });

    return res.json(reservations);
  } catch (err) {
    errorHandler(err, res);
  }
});

export default establishmentReservationRouter;
