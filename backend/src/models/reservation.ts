import { Schema, Types, model, Document } from 'mongoose';

export interface IReservationSchema extends Document {
  userId: Types.ObjectId;
  establishmentId: Types.ObjectId;
  schedule: Date;
  aprooved: boolean | null;
  closed: boolean | null;
  feedback: null | Types.ObjectId;
}

const ReservationSchema: Schema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  establishmentId: { type: Types.ObjectId, ref: 'Establishment' },
  schedule: Date,
  aprooved: Boolean,
  closed: Boolean,
  feedback: {
    type: Types.ObjectId,
    ref: 'Feedback',
  },
});

export const Reservation = model<IReservationSchema>('Reservation', ReservationSchema);
