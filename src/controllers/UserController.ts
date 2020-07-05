import { User } from '../models/user';
import { hash } from 'bcrypt';
import AppError from '../errors/AppError';
import { Types } from 'mongoose';
import { removeFile } from '../config/upload';

interface StoreRequst {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface UpdateRequest {
  user_id: Types.ObjectId;
  name?: string | null;
  avatar?: string | null;
}

class UserController {
  public async store({ name, email, password, avatar }: StoreRequst) {
    let user = await User.findOne({ email });

    if (user) {
      throw new AppError('User alredy exists', 400);
    }

    const hashPassword = await hash(password, 8);
    user = await User.create({
      email,
      name,
      hashPassword,
      avatar,
    });

    user = user.toJSON();

    delete user?.hashPassword;

    return user;
  }

  public async update({ user_id, name, avatar }: UpdateRequest) {
    let user = await User.findById(user_id);

    if (user?.avatar && avatar) {
      removeFile(user.avatar);
      user.avatar = avatar;
    }

    if (user?.name && name) user.name = name;

    user?.save();

    user = user?.toJSON();

    delete user?.hashPassword;

    return user;
  }
}

export default new UserController();
