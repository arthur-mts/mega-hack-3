import { Types } from 'mongoose';
import { hash } from 'bcrypt';
import { Reservation, ReservationStatus } from '../models/reservation';
import AppError from '../errors/AppError';

interface ListRequest {
  establishment_id: Types.ObjectId;
  filter: string;
}

class EstablishmentReservationController {
  public async validate({ reservation_id }: { reservation_id: string }) {
    const reservation = await Reservation.findById(reservation_id);

    if (!reservation) throw new AppError('Reservation not found', 404);

    reservation.status = ReservationStatus.APPROVED;

    await reservation.save();

    const validationCode = await hash(reservation_id, 2);

    return { reservation, validationCode };
  }

  public async list({ establishment_id, filter }: ListRequest) {
    const reservations = await Reservation.find({ establishmentId: establishment_id });
    //TODO filtrar reservas do estabelecimento pelo enum de status

    if (filter) {
      switch (filter) {
        case 'approved':
          console.log('only approved reservations');
          break;
        case 'closeds':
          console.log('only coseds');
          break;
      }
    }

    return reservations;
  }
}

export default new EstablishmentReservationController();
