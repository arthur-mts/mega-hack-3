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
    const { id } = req.params;

    console.log(id);
    const { reservation, validationCode } = await EstablishmentReservationController.validate({ reservation_id: id });

    return res.json({ reservation, validationCode });
  } catch (err) {
    errorHandler(err, res);
  }
});

export default establishmentReservationRouter;
