import AppError from '../errors/AppError';
import { compare } from 'bcrypt';
import { Reservation, ReservationStatus } from '../models/reservation';

interface InRequest {
  checkInValidator: string;
  reservation_id: string;
}

class CheckReservationController {
  public async in({ reservation_id, checkInValidator }: InRequest) {
    const reservation = await Reservation.findById(reservation_id);

    if (!reservation) throw new AppError('Reservation not found', 404);

    if (!(await compare(reservation_id, checkInValidator))) throw new AppError('Check-in unauthorized', 401);

    if (reservation.status != ReservationStatus.APPROVED) throw new AppError('Check-in unauthorized', 401);

    reservation.status = ReservationStatus.OPEN;

    await reservation.save();

    return;
  }
}

export default new CheckReservationController();
