import { Establishment } from '../models/establishment';
import { hash } from 'bcrypt';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  description: string;
  maxReservations: number;
  email: string;
  latitude: any;
  longitude: any;
  password: string;
  avatar: string;
  phoneNumber: string;
}

class EstablishmentController {
  public async store({
    name,
    email,
    password,
    avatar,
    description,
    maxReservations,
    latitude,
    longitude,
    phoneNumber,
  }: Request) {
    let establishment = await Establishment.findOne({ email });

    if (establishment) {
      throw new AppError('Establishment alredy exists', 400);
    }

    const hashPassword = await hash(password, 8);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    establishment = await Establishment.create({
      email,
      name,
      hashPassword,
      avatar,
      description,
      phoneNumber,
      maxReservations,
      location,
    });

    establishment = establishment.toJSON();

    delete establishment?.hashPassword;

    return establishment;
  }
}

export default new EstablishmentController();
