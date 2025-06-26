import { Schema, Types, model, } from 'mongoose';

import { ITopic } from './interfaces';


const topicSchema = new Schema<ITopic>({
  title: { type: String, required: true, trim: true },
  level: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
});

const Topic = model<ITopic>('Topic', topicSchema);
export { Topic, ITopic };

