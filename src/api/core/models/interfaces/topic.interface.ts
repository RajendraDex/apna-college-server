import{ Types, Document } from 'mongoose';

export interface ITopic extends Document {
  title: string;
  level: 'Easy' | 'Medium' | 'Hard';
  problems: Types.ObjectId[];
}