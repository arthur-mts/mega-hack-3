import { Schema, model, Document, Types } from 'mongoose';
import PointSchema, { IPointSchema } from './util/point';
import { IReservationSchema, Reservation, ReservationStatus } from './reservation';

export interface IScoreSchema {
  attendance: Number;
  hygiene: Number;
  price: Number;
  drinksQuality: Number;
}

const ScoreSchema: Schema = new Schema({
  attendance: { type: Number },
  hygiene: { type: Number },
  price: { type: Number },
  drinksQuality: { type: Number },
});

export interface IEstablishmentSchema extends Document {
  name: string;
  description: string;
  feedbacks_count?: Promise<Types.ObjectId[]>;
  email: string;
  location: IPointSchema;
  hashPassword: string;
  avatar: string;
  avatar_url?: string;
  reservations_count?: number;
  phoneNumber: string;
  reservations?: [Schema.Types.ObjectId];
  score?: IScoreSchema;
}

const EstablishmentSchema: Schema = new Schema(
  {
    name: String,
    description: String,
    score: { type: ScoreSchema },
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
    email: String,
    hashPassword: String,
    location: {
      type: PointSchema,
      index: '2dsphere',
    },
    avatar: {
      required: false,
      type: String,
    },
    phoneNumber: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

EstablishmentSchema.virtual('avatar_url').get(function (this: { avatar: String }) {
  return `http://${process.env.IP}:${process.env.HTTP_PORT}/files/${this.avatar}`;
});

EstablishmentSchema.virtual('reservations_count').get(function (this: { reservations: Array<IReservationSchema> }) {
  return this.reservations.length;
});

// return Promise.all<Types.ObjectId>(
//   this.reservations.filter(async (item) => {
//     const reservation = await Reservation.findById(item);
//     return reservation?.status == ReservationStatus.CLOSED && reservation.feedback;
//   }),
// );

export const Establishment = model<IEstablishmentSchema>('Establishment', EstablishmentSchema);
