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

//TODO Validar se as reservas pertencem a esse estabelecimento

establishmentReservationRouter.post('/approve/:id', async (req, res) => {
  try {
    const { establishment_id } = req;

    const { id } = req.params;

    const { reservation, validationCode } = await EstablishmentReservationController.approve({
      establishment_id,
      reservation_id: id,
    });

    return res.json({ reservation, validationCode });
  } catch (err) {
    errorHandler(err, res);
  }
});

establishmentReservationRouter.post('/refuse/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await EstablishmentReservationController.refuse({ reservation_id: id });

    return res.status(200).send();
  } catch (err) {
    errorHandler(err, res);
  }
});

establishmentReservationRouter.post('/checkout/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await EstablishmentReservationController.checkout({ reservation_id: id });

    return res.status(200).send();
  } catch (err) {
    errorHandler(err, res);
  }
});

export default establishmentReservationRouter;
