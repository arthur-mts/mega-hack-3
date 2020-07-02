import { Establishment } from '../models/establishment';
import AppError from '../errors/AppError';
import { Types } from 'mongoose';
import { Reservation, IReservationSchema } from '../models/reservation';
import { User } from '../models/user';

interface StoreRequest {
  establishment_id: Types.ObjectId;
  date: string;
  user_id: Types.ObjectId;
}

class ReservationController {
  public async store({ establishment_id, date, user_id }: StoreRequest) {
    const establishment = await Establishment.findById(establishment_id);

    if (!establishment) {
      throw new AppError('Invalid establishment', 404);
    }

    const reservation = await Reservation.create({
      establishmentId: establishment_id,
      schedule: new Date(date),
      userId: user_id,
      aprooved: null,
      feedback: null,
      closed: null,
    });

    //send notification to establishment

    await Establishment.findByIdAndUpdate(establishment._id, { $push: { reservations: reservation._id } });

    await User.findByIdAndUpdate(user_id, { $push: { reservations: reservation._id } });

    return reservation;
  }

  public async list({ user_id }: { user_id: Types.ObjectId }) {
    const user = await User.findById(user_id);

    console.log(user?.reservations);

    let reservations = user?.reservations?.map(async (item) => {
      return await Reservation.findById(item).populate('establishmentId');
    });

    if (reservations) return await Promise.all(reservations);
  }
}

export default new ReservationController();
