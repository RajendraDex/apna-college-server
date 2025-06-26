import mongoose, { Document, Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './interfaces';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  progress: [
    {
      topicId: { type: Schema.Types.ObjectId, ref: 'Topic' },
      completedProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    },
  ],
});


userSchema.pre<IUser>('save', async function () {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

userSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export { User, IUser };
