import { Establishment } from '../models/establishment';
import AppError from '../errors/AppError';
import { Types } from 'mongoose';
import { Reservation } from '../models/reservation';

interface Request {
  establishment_id: Types.ObjectId;
  date: string;
  user_id: Types.ObjectId;
}

class ReservationController {
  public async store({ establishment_id, date, user_id }: Request) {
    const establishment = await Establishment.findById(establishment_id);

    if (!establishment) {
      throw new AppError('Invalid establishment', 404);
    }

    if (establishment.reservations_count === establishment.maxReservations)
      throw new AppError('Full reservations', 400);

    const reservation = await Reservation.create({
      establishmentId: establishment_id,
      schedule: new Date(date),
      userId: user_id,
      isOpen: true,
    });

    return reservation;
  }
}

export default new ReservationController();
