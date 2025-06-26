import{ Types, Document } from 'mongoose';

export interface IProblem extends Document {
  title: string;
  youtubeLink: string;
  leetcodeLink: string;
  articleLink: string;
  level: 'Easy' | 'Medium' | 'Hard';
}
