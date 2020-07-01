import { Document, Schema, model } from 'mongoose';
import { compare } from 'bcrypt';

export interface IUserSchema extends Document {
  name: string;
  email: string;
  hashPassword: string;
  thumbnail: string;
  thumbnail_url?: string;
}

export const UserSchema: Schema = new Schema(
  {
    name: String,
    thumbnail: String,
    email: String,
    hashPassword: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.virtual('thumbnail_url').get(function (this: { thumbnail: String }) {
  return `http://${process.env.IP}:${process.env.HTTP_PORT}/files/${this.thumbnail}`;
});

export const User = model<IUserSchema>('User', UserSchema);

export function checkPassword(hashPassword: string, password: string) {
  return compare(password, hashPassword);
}
