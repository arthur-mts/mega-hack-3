import { Schema, model, Document } from 'mongoose';
import PointSchema, { IPointSchema } from './util/point';

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
}

const EstablishmentSchema: Schema = new Schema(
  {
    name: String,
    description: String,
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
    phoneNumber: {
      required: false,
      type: String,
    },
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

EstablishmentSchema.virtual('reservations_count').get(function (this: { reservations: Array<any> }) {
  return this.reservations.length;
});

export const Establishment = model<IEstablishmentSchema>('Establishment', EstablishmentSchema);
