import { Schema, Types, model, Document } from 'mongoose';

// SERÁ UM NUMERO DE 1 A 5 (ESTRELAS)

export interface IFeedback {
  description: string;
  attendance: number;
  hygiene: number;
  price: number;
  drinksQuality: number;
}

const FeedbackSchema = new Schema({
  description: String,
  attendance: Number,
  hygiene: Number,
  price: Number,
  drinksQuality: Number,
});

export enum ReservationStatus {
  PENDING = 'PENDING',
  REFUSED = 'REFUSED',
  APPROVED = 'APPROVED',
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  //TODO: Rever a regra de negocio de quando o user da checkin
}

export interface IReservationSchema extends Document {
  userId: Types.ObjectId;
  establishmentId: Types.ObjectId;
  schedule: Date;
  feedback?: IFeedback;
  status?: ReservationStatus;
}

// pending, refused, approved, closed
const ReservationSchema: Schema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  establishmentId: { type: Types.ObjectId, ref: 'Establishment' },
  schedule: Date,
  status: {
    type: String,
    enum: ['PENDING', 'REFUSED', 'APPROVED', 'CLOSED', 'OPEN'],
    default: 'PENDING',
  },
  feedback: {
    type: FeedbackSchema,
    default: undefined,
  },
});

export const Reservation = model<IReservationSchema>('Reservation', ReservationSchema);
