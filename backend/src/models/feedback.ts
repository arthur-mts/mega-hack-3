import { Schema, model, Document } from 'mongoose';

export interface IFeedbackSchema extends Document {
  description: string;
  attendance: number;
  hygiene: number;
  price: number;
  drinksQuality: number;
}

// SERÁ UM NUMERO DE 1 A 5 (ESTRELAS)
const FeedbackSchema: Schema = new Schema({
  description: String,
  attendance: Number,
  hygiene: Number,
  price: Number,
  drinksQuality: Number,
});

export const Feedback = model<IFeedbackSchema>('Feedback', FeedbackSchema);
