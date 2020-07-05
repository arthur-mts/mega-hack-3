import { Document, Schema, model, Types } from 'mongoose';
import { compare } from 'bcrypt';

export interface IUserSchema extends Document {
  name: string;
  email: string;
  hashPassword: string;
  reservations?: [Types.ObjectId];
  avatar: string;
  avatar_url?: string;
}

export const UserSchema: Schema = new Schema(
  {
    name: String,
    avatar: String,
    email: String,
    hashPassword: String,
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reservation',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.virtual('avatar_url').get(function (this: { avatar: String }) {
  return `${process.env.APP_URL}/files/${this.avatar}`;
});

export const User = model<IUserSchema>('User', UserSchema);

export function checkPassword(hashPassword: string, password: string) {
  return compare(password, hashPassword);
}
