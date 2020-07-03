import { Establishment } from '../models/establishment';
import { Types } from 'mongoose';
import { Reservation } from '../models/reservation';

interface ListRequest {
  establishment_id: Types.ObjectId;
  filter: string;
}

class EstablishmentReservationController {
  public async list({ establishment_id, filter }: ListRequest) {
    const establishment = await Establishment.findById(establishment_id);

    let reservations = establishment?.reservations?.map(async (item) => {
      const reservation = await Reservation.findById(item);

      let establishment = await Establishment.findById(reservation?.establishmentId);

      establishment = establishment?.toJSON();

      delete establishment?.hashPassword;

      return { reservation, establishment };
    });

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

    if (reservations) return await Promise.all(reservations);
    else return [];
  }
}

export default new EstablishmentReservationController();
