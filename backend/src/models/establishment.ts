import { Schema, model, Document, Types } from 'mongoose';
import PointSchema, { IPointSchema } from './util/point';
import mongoosePaginate from 'mongoose-paginate';

export interface IEstablishmentSchema extends Document {
  name: string;
  description: string;
  location: IPointSchema;
  category: string;
  thumbnail: string;
  owner: Types.ObjectId;
  thumbnail_url: string;
  phoneNumber: string;
}

export const EstablishmentSchema: Schema = new Schema(
  {
    name: String,
    description: String,
    email: String,
    hashPassword: String,
    location: {
      type: PointSchema,
      index: '2dsphere',
    },

    thumbnail: {
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

EstablishmentSchema.virtual('thumbnail_url').get(function (this: { thumbnail: String }) {
  return `http://${process.env.IP}:${process.env.HTTP_PORT}/files/${this.thumbnail}`;
});

EstablishmentSchema.plugin(mongoosePaginate);

export const Mark = model<IEstablishmentSchema>('Mark', EstablishmentSchema);
