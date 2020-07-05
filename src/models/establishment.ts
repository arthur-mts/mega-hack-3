import { Schema, model, Document, Types } from 'mongoose';
import PointSchema, { IPointSchema } from './util/point';
import { IReservationSchema } from './reservation';

export interface IScoreSchema {
  attendance: number;
  hygiene: number;
  price: number;
  drinksQuality: number;
  empaty: boolean;
}

const ScoreSchema: Schema = new Schema({
  attendance: { type: Number, default: 0 },
  hygiene: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  drinksQuality: { type: Number, default: 0 },
  empaty: { type: Boolean, default: true },
});

export interface IEstablishmentSchema extends Document {
  name: string;
  description: string;
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
    score: { type: ScoreSchema, default: {} },
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
  return `${process.env.APP_URL}/files/${this.avatar}`;
});

EstablishmentSchema.virtual('reservations_count').get(function (this: { reservations: Array<IReservationSchema> }) {
  return this.reservations.length;
});

//TODO arrumar um jeito de fazer com que o estabelecimento possa ter acesso em tempo
// real a todas as reservas feitas

export const Establishment = model<IEstablishmentSchema>('Establishment', EstablishmentSchema);
