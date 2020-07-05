import { IFeedback, IReservationSchema } from '../models/reservation';
import { IEstablishmentSchema } from '../models/establishment';

interface Request {
  feedback: IFeedback;
  establishment: IEstablishmentSchema;
  reservations: Array<IReservationSchema>;
}

export default async function ({ establishment, feedback, reservations }: Request) {
  console.log(feedback);
  if (establishment.score?.empaty) {
    establishment.score = {
      attendance: feedback.attendance,
      drinksQuality: feedback.drinksQuality,
      hygiene: feedback.hygiene,
      price: feedback.price,
      empaty: false,
    };
  } else if (establishment.score) {
    establishment.score.attendance =
      establishment.score.attendance +
      ((feedback.attendance - establishment.score.attendance) / reservations.length + 1);

    establishment.score.price =
      establishment.score.price + ((feedback.price - establishment.score.price) / reservations.length + 1);

    establishment.score.drinksQuality =
      establishment.score.drinksQuality +
      ((feedback.drinksQuality - establishment.score.drinksQuality) / reservations.length + 1);

    establishment.score.hygiene =
      establishment.score.hygiene + ((feedback.hygiene - establishment.score.hygiene) / reservations.length + 1);
  }

  await establishment.save();
  return;
}
