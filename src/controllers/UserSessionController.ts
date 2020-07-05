import { User, checkPassword } from '../models/user';
import AppError from '../errors/AppError';
import jwt from 'jsonwebtoken';

interface Request {
  email: string;
  password: string;
}

class SessionController {
  public async store({ email, password }: Request) {
    let user = await User.findOne({ email });

    if (!user || !(await checkPassword(user.hashPassword, password))) {
      throw new AppError('Login error', 400);
    }

    const token = jwt.sign({ _id: user._id }, String(process.env.JWT_SECRET));

    user = user.toJSON();

    delete user?.hashPassword;

    return { user, token };
  }
}

export default new SessionController();
