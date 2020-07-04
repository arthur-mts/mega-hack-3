import { Router } from 'express';
import errorHandler from '../errors/ErrorHandlerFunction';
import UserReservationController from '../controllers/UserReservationController';
import CheckReservationController from '../controllers/CheckReservationController';

const userReservationRouter = Router();

userReservationRouter.post('/', async (req, res) => {
  try {
    const { user_id } = req;

    const { establishment_id, date } = req.body;

    const reservation = await UserReservationController.store({ establishment_id, user_id, date });

    return res.json(reservation);
  } catch (err) {
    errorHandler(err, res);
  }
});

userReservationRouter.get('/', async (req, res) => {
  try {
    const { user_id } = req;

    const reservations = await UserReservationController.list({ user_id });

    return res.json(reservations);
  } catch (err) {
    errorHandler(err, res);
  }
});

userReservationRouter.post('/checkin', async (req, res) => {
  try {
    const { validator, reservation_id } = req.body;
    await CheckReservationController.in({ checkInValidator: validator, reservation_id });
    return res.status(200).send();
  } catch (err) {
    errorHandler(err, res);
  }
});

export default userReservationRouter;