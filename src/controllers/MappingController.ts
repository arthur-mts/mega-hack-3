import { Establishment } from '../models/establishment';

interface ListRequest {
  latitude: Number;
  longitude: Number;
  radius: Number;
}

class MappingController {
  public async list({ latitude, longitude, radius = 10000 }: ListRequest) {
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
    });

    return establishments;
  }
}

export default new MappingController();
