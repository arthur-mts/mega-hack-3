import { Schema, Types, model, Document } from 'mongoose';

export interface IReservationSchema extends Document {
  userId: Types.ObjectId;
  establishmentId: Types.ObjectId;
  schedule: Date;
  isOpen: boolean;
}

const ReservationSchema: Schema = new Schema({
  userId: Types.ObjectId,
  establishmentId: Types.ObjectId,
  schedule: Date,
  isOpen: Boolean,
});

export const Reservation = model<IReservationSchema>('Reservation', ReservationSchema);
