import { User } from '../models/user';
import { hash } from 'bcrypt';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  thumbnail: string;
}

class UserController {
  public async store({ name, email, password, thumbnail }: Request) {
    let user = await User.findOne({ email });

    if (user) {
      throw new AppError('User alredy exists', 400);
    }

    const hashPassword = await hash(password, 8);
    user = await User.create({
      email,
      name,
      hashPassword,
      thumbnail,
    });

    user = user.toJSON();

    delete user?.hashPassword;

    return user;
  }
}

export default new UserController();
