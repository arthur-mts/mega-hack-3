import { Schema, Types, model, Document } from 'mongoose';

export enum ReservationStatus {
  PENDING = 'PENDING',
  REFUSED = 'REFUSED',
  APPROVED = 'APPROVED',
  CLOSED = 'CLOSED',
}

export interface IReservationSchema extends Document {
  userId: Types.ObjectId;
  establishmentId: Types.ObjectId;
  schedule: Date;
  feedback?: Types.ObjectId;
  status?: ReservationStatus;
}

// pending, refused, approved, closed
const ReservationSchema: Schema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  establishmentId: { type: Types.ObjectId, ref: 'Establishment' },
  schedule: Date,
  status: {
    type: String,
    enum: ['PENDING', 'REFUSED', 'APPROVED', 'CLOSED'],
    default: 'PENDING',
  },
  feedback: {
    type: Types.ObjectId,
    ref: 'Feedback',
    default: undefined,
  },
});

export const Reservation = model<IReservationSchema>('Reservation', ReservationSchema);
