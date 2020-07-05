import { Establishment } from '../models/establishment';
import { hash } from 'bcrypt';
import AppError from '../errors/AppError';
import { removeFile } from '../config/upload';
import { Types } from 'mongoose';

interface ListRequest {
  latitude: string;
  longitude: string;
  radius: number;
}

interface StoreRequest {
  name: string;
  description: string;
  email: string;
  latitude: any;
  longitude: any;
  password: string;
  avatar: string;
  phoneNumber: string;
}

interface UpdateRequest {
  establishment_id: Types.ObjectId;
  name?: string;
  description?: string;
  email?: string;
  latitude?: Number;
  longitude?: Number;
  avatar?: string;
  phoneNumber?: string;
}

class EstablishmentController {
  public async store({ name, email, password, avatar, description, latitude, longitude, phoneNumber }: StoreRequest) {
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
      location,
    });

    establishment = establishment.toJSON();

    delete establishment?.hashPassword;

    return establishment;
  }

  public async list({ latitude, longitude, radius }: ListRequest) {
    const establishments = await Establishment.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: radius,
        },
      },
    }).select('-hashPassword');

    return establishments;
  }

  public async update({
    avatar,
    description,
    latitude,
    longitude,
    name,
    phoneNumber,
    establishment_id,
  }: UpdateRequest) {
    let establishment = await Establishment?.findById(establishment_id);

    if (establishment) {
      if (avatar) {
        removeFile(establishment.avatar);
        establishment.avatar = avatar;
      }

      establishment.description = description || establishment.description;

      establishment.name = name || establishment.name;

      establishment.phoneNumber = phoneNumber || establishment.phoneNumber;

      if (latitude && longitude) {
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };
        establishment.location = location;
      }

      await establishment.save();
    }

    establishment = establishment?.toJSON();

    delete establishment?.hashPassword;

    return establishment;
  }
}

export default new EstablishmentController();
