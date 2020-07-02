import { Router } from 'express';
import errorHandler from '../errors/ErrorHandlerFunction';
import ReservationController from '../controllers/ReservationController';

const reservationRouter = Router();

reservationRouter.post('/', async (req, res) => {
  try {
    const { user_id } = req;

    const { establishment_id, date } = req.body;

    const reservation = await ReservationController.store({ establishment_id, user_id, date });

    return res.json(reservation);
  } catch (err) {
    errorHandler(err, res);
  }
});

reservationRouter.get('/', async (req, res) => {
  try {
    const { user_id } = req;

    const reservations = await ReservationController.list({ user_id });

    return res.json(reservations);
  } catch (err) {
    errorHandler(err, res);
  }
});

export default reservationRouter;
