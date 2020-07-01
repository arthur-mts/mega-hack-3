import { checkPassword } from '../models/user';
import AppError from '../errors/AppError';
import jwt from 'jsonwebtoken';
import { Establishment } from '../models/establishment';

interface Request {
  email: string;
  password: string;
}

class SessionController {
  public async store({ email, password }: Request) {
    let establishment = await Establishment.findOne({ email });

    if (!establishment || !(await checkPassword(establishment.hashPassword, password))) {
      throw new AppError('Login error', 400);
    }

    const token = jwt.sign({ _id: establishment._id }, String(process.env.JWT_SECRET));

    establishment = establishment.toJSON();

    delete establishment?.hashPassword;

    return { establishment, token };
  }
}

export default new SessionController();
