import AppError from '../errors/AppError';
import { Types } from 'mongoose';
import { Reservation, IReservationSchema, ReservationStatus } from '../models/reservation';
import { Establishment } from '../models/establishment';
import UpdateEstablishmentScoreService from '../services/UpdateEstablishmentScoreService';

interface StoreRequest {
  description: string;
  attendance: number;
  hygiene: number;
  price: number;
  drinksQuality: number;
  reservation_id: string;
  user_id: Types.ObjectId;
}

class UserFeedbackController {
  public async store({
    user_id,
    description,
    attendance,
    hygiene,
    price,
    drinksQuality,
    reservation_id,
  }: StoreRequest) {
    const reservation = await Reservation.findById(reservation_id);

    if (!reservation) throw new AppError('Reservation not found', 404);

    if (!reservation.userId.equals(user_id)) throw new AppError('Feedback unauthorized', 401);

    reservation.feedback = { attendance, description, drinksQuality, hygiene, price };

    const reservationsWithFeedback = await Reservation.find({
      establishmentId: reservation.establishmentId,
      status: ReservationStatus.CLOSED,
      feedback: { $exists: true },
    });

    const establishment = await Establishment.findById(reservation.establishmentId);

    if (establishment)
      UpdateEstablishmentScoreService({
        establishment,
        feedback: { attendance, description, drinksQuality, hygiene, price },
        reservations: reservationsWithFeedback,
      })
        .then(() => {
          console.log('Establishemtn score updated successfully');
        })
        .catch((err) => {
          console.error(err);
        });

    return;
  }
}

export default new UserFeedbackController();
