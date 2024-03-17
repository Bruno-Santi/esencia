import { Type } from 'class-transformer';
import mongoose from 'mongoose';

export const convertStringToObj = (str: string) => {
  const convertedString = new mongoose.Types.ObjectId(str);

  return convertedString;
};
