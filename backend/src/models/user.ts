import { Document, Schema, model } from 'mongoose';
import { compare } from 'bcrypt';

export interface IUserSchema extends Document {
  name: string;
  email: string;
  hashPassword: string;
  avatar: string;
  avatar_url?: string;
}

export const UserSchema: Schema = new Schema(
  {
    name: String,
    avatar: String,
    email: String,
    hashPassword: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.virtual('avatar_url').get(function (this: { avatar: String }) {
  return `http://${process.env.IP}:${process.env.HTTP_PORT}/files/${this.avatar}`;
});

export const User = model<IUserSchema>('User', UserSchema);

export function checkPassword(hashPassword: string, password: string) {
  return compare(password, hashPassword);
}
