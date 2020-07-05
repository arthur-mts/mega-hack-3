import { Types } from 'mongoose';
import { hash } from 'bcrypt';
import { Reservation, ReservationStatus } from '../models/reservation';
import AppError from '../errors/AppError';

interface ListRequest {
  establishment_id: Types.ObjectId;
  filter: string;
}

class EstablishmentReservationController {
  public async checkout({ reservation_id }: { reservation_id: string }) {
    const reservation = await Reservation.findById(reservation_id);

    if (!reservation) throw new AppError('Reservation not found', 404);

    if (reservation.status != ReservationStatus.OPEN) throw new AppError('Checkout unauthorized', 401);

    reservation.status = ReservationStatus.CLOSED;

    //TODO notificar usuario quando a reserva for fechada e permitir o feedback

    await reservation.save();

    return;
  }

  public async refuse({ reservation_id }: { reservation_id: string }) {
    const reservation = await Reservation.findById(reservation_id);

    if (!reservation) throw new AppError('Reservation not found', 404);

    reservation.status = ReservationStatus.REFUSED;

    //TODO notificar usuario quando a reserva for recusada

    await reservation.save();

    return;
  }

  public async approve({
    reservation_id,
    establishment_id,
  }: {
    reservation_id: string;
    establishment_id: Types.ObjectId;
  }) {
    const reservation = await Reservation.findById(reservation_id);

    if (!reservation) throw new AppError('Reservation not found', 404);

    reservation.status = ReservationStatus.APPROVED;

    //TODO notificar o usuario quando a reserva for aprovada

    await reservation.save();

    const validationCode = await hash(reservation_id, 2);

    const approvedReservations = await Reservation.find({
      establishmentId: establishment_id,
      status: ReservationStatus.APPROVED,
    });

    return { reservation, validationCode, approvedReservations: approvedReservations.length };
  }

  public async list({ establishment_id, filter }: ListRequest) {
    const reservations = await Reservation.find({ establishmentId: establishment_id });

    if (filter) {
      switch (filter) {
        case 'approved':
          return reservations.filter((item) => item.status == ReservationStatus.APPROVED);
        case 'closed':
          return reservations.filter((item) => item.status == ReservationStatus.CLOSED);
        case 'open':
          return reservations.filter((item) => item.status == ReservationStatus.OPEN);
        case 'pending':
          return reservations.filter((item) => item.status == ReservationStatus.PENDING);
        case 'refused':
          return reservations.filter((item) => item.status == ReservationStatus.REFUSED);
      }
    }

    return reservations;
  }
}

export default new EstablishmentReservationController();
