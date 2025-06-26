import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  progress: {
    topicId: Types.ObjectId;
    completedProblems: Types.ObjectId[];
  }[];
  verifyPassword(password: string): Promise<boolean>;
}