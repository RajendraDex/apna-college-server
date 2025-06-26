import mongoose, { Schema, model, Document } from 'mongoose';
import { IProblem } from './interfaces';

const problemSchema = new Schema<IProblem>({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  youtubeLink: { 
    type: String 
  },
  leetcodeLink: { 
    type: String
   },
  articleLink: { 
    type: String 
  },
  level: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    required: true 
  },
});

const Problem = model<IProblem>('Problem', problemSchema);
export { Problem, IProblem };